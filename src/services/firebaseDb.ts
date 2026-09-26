import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  SiteSettings,
  HeroSectionData,
  AboutSectionData,
  StatItem,
  SkillItem,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  ServiceItem,
  ProcessStepItem,
  TestimonialItem,
  AchievementItem,
  ContactMessageItem,
  MediaItem,
  RedirectItem,
  FaqItem,
  CVVersionItem,
  CustomPageItem,
  SubscriberItem,
  User,
  ActivityLogItem
} from '../types';
import {
  initialSiteSettings,
  initialHeroData,
  initialAboutData,
  initialStats,
  initialSkills,
  initialExperiences,
  initialEducation,
  initialProjects,
  initialServices,
  initialProcessSteps,
  initialTestimonials,
  initialAchievements,
  initialContactMessages,
  initialMediaItems,
  initialRedirects,
  initialFaqs,
  initialCvVersions,
  initialCustomPages,
  initialSubscribers,
  initialUsers,
  initialActivityLogs
} from '../data/initialData';

// Helper to remove undefined fields which Firestore rejects
export function cleanForFirestore<T>(data: T): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

// ----------------------------------------------------
// SINGLETON DOCUMENT HANDLERS (Settings, Hero, About)
// ----------------------------------------------------
export async function syncSingletonDoc<T extends object>(
  collectionName: string,
  docId: string,
  fallbackData: T,
  onUpdate: (data: T) => void
): Promise<() => void> {
  const docRef = doc(db, collectionName, docId);

  // Real-time listener: uses local cache immediately, then syncs with server
  const unsubscribe = onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate({ ...fallbackData, ...(snapshot.data() as T) });
      } else if (!snapshot.metadata.fromCache) {
        // Seed Firestore if document does not exist on server
        setDoc(docRef, cleanForFirestore(fallbackData), { merge: true }).catch(() => {});
        onUpdate(fallbackData);
      }
    },
    (error) => {
      // Offline / unavailable: Firestore automatically operates in offline mode
      if (error.code !== 'unavailable') {
        console.warn(`Firestore snapshot note for ${collectionName}:`, error.message);
      }
    }
  );

  return unsubscribe;
}

export async function saveSingletonDoc<T extends object>(
  collectionName: string,
  docId: string,
  data: T
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, cleanForFirestore(data), { merge: true });
  } catch (err) {
    console.error(`Error saving ${collectionName}/${docId} to Firestore:`, err);
    throw err;
  }
}

// ----------------------------------------------------
// DEDUPLICATION UTILITY
// ----------------------------------------------------
export function deduplicateById<T extends { id?: string | number }>(items: T[]): T[] {
  if (!Array.isArray(items)) return [];
  const seen = new Set<string | number>();
  return items.filter((item) => {
    if (!item || item.id === undefined || item.id === null) return true;
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

// ----------------------------------------------------
// COLLECTION HANDLERS (Projects, Skills, Services, etc.)
// ----------------------------------------------------
export async function syncCollection<T extends { id: string }>(
  collectionName: string,
  initialItems: T[],
  onUpdate: (items: T[]) => void
): Promise<() => void> {
  const colRef = collection(db, collectionName);

  // Real-time listener: uses local cache first, updates when server responds
  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as object) } as T));
        onUpdate(deduplicateById(items));
      } else if (!snapshot.metadata.fromCache && initialItems.length > 0) {
        // Seed collection if verified empty on server
        Promise.all(
          initialItems.map((item) =>
            setDoc(doc(db, collectionName, item.id), cleanForFirestore(item), { merge: true })
          )
        ).catch(() => {});
        onUpdate(deduplicateById(initialItems));
      }
    },
    (error) => {
      // Offline / unavailable: Firestore automatically operates in offline mode
      if (error.code !== 'unavailable') {
        console.warn(`Firestore listener note on ${collectionName}:`, error.message);
      }
    }
  );

  return unsubscribe;
}

export async function saveItemToCollection<T extends { id: string }>(
  collectionName: string,
  item: T
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, item.id);
    await setDoc(docRef, cleanForFirestore(item), { merge: true });
  } catch (err) {
    console.error(`Error saving document to ${collectionName}:`, err);
    throw err;
  }
}

export async function deleteItemFromCollection(
  collectionName: string,
  id: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error(`Error deleting document from ${collectionName}:`, err);
    throw err;
  }
}

// ----------------------------------------------------
// INBOUND CONTACT MESSAGES
// ----------------------------------------------------
export async function submitContactMessage(
  messageData: Omit<ContactMessageItem, 'id' | 'createdAt' | 'status'>
): Promise<ContactMessageItem> {
  const newId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
  const fullMessage: ContactMessageItem = {
    id: newId,
    name: messageData.name,
    email: messageData.email,
    subject: messageData.subject || 'Portfolio Inquiry',
    message: messageData.message,
    status: 'unread',
    createdAt: new Date().toISOString()
  };

  const docRef = doc(db, 'contact_messages', newId);
  await setDoc(docRef, cleanForFirestore(fullMessage));
  return fullMessage;
}

// ----------------------------------------------------
// AI ASSISTANT QUERY LOGGING
// ----------------------------------------------------
export interface AiQueryRecord {
  id?: string;
  userQuery: string;
  assistantReply: string;
  mode: string;
  model: string;
  timestamp?: string;
  clientEmail?: string;
  clientName?: string;
}

export async function recordAiQueryInFirestore(queryData: AiQueryRecord): Promise<AiQueryRecord & { id: string }> {
  const newId = 'aiq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
  const fullRecord = {
    id: newId,
    userQuery: queryData.userQuery,
    assistantReply: queryData.assistantReply,
    mode: queryData.mode || 'general',
    model: queryData.model || 'gemini-3.8-flash',
    timestamp: queryData.timestamp || new Date().toISOString(),
    clientEmail: queryData.clientEmail || 'visitor@portfolio.dev',
    clientName: queryData.clientName || 'Portfolio Visitor',
    notificationSent: false
  };

  try {
    const docRef = doc(db, 'ai_queries', newId);
    await setDoc(docRef, cleanForFirestore(fullRecord));
  } catch (err) {
    console.warn('Could not write AI query record to Firestore:', err);
  }
  return fullRecord;
}

// ----------------------------------------------------
// FULL DATA UPLOAD TO FIRESTORE
// ----------------------------------------------------
export async function uploadAllPortfolioDataToFirestore(): Promise<{
  success: boolean;
  totalUploaded: number;
  details: Record<string, number>;
}> {
  const details: Record<string, number> = {};

  try {
    // 1. Singletons
    await setDoc(doc(db, 'site_settings', 'main'), cleanForFirestore(initialSiteSettings));
    details['site_settings'] = 1;

    await setDoc(doc(db, 'hero_data', 'main'), cleanForFirestore(initialHeroData));
    details['hero_data'] = 1;

    await setDoc(doc(db, 'about_data', 'main'), cleanForFirestore(initialAboutData));
    details['about_data'] = 1;

    // 2. Collections
    const collectionsToUpload = [
      { name: 'projects', data: initialProjects },
      { name: 'skills', data: initialSkills },
      { name: 'services', data: initialServices },
      { name: 'experiences', data: initialExperiences },
      { name: 'education', data: initialEducation },
      { name: 'process_steps', data: initialProcessSteps },
      { name: 'testimonials', data: initialTestimonials },
      { name: 'stats', data: initialStats },
      { name: 'achievements', data: initialAchievements },
      { name: 'faqs', data: initialFaqs },
      { name: 'cv_versions', data: initialCvVersions },
      { name: 'media_items', data: initialMediaItems },
    ];

    for (const col of collectionsToUpload) {
      await Promise.all(
        col.data.map((item) =>
          setDoc(doc(db, col.name, (item as { id: string }).id), cleanForFirestore(item))
        )
      );
      details[col.name] = col.data.length;
    }

    const totalUploaded = Object.values(details).reduce((sum, val) => sum + val, 0);
    return { success: true, totalUploaded, details };
  } catch (error) {
    console.error('Failed to complete upload to Firestore:', error);
    throw error;
  }
}
