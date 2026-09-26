import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
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
  initialFaqs,
  initialCvVersions,
  initialMediaItems,
} from '../src/data/initialData';

// Helper to remove undefined fields which Firestore rejects
function cleanForFirestore<T>(data: T): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

async function main() {
  console.log('🚀 Starting complete data upload to Firestore...');
  console.log('Project ID:', firebaseConfig.projectId);
  console.log('Firestore Database ID:', firebaseConfig.firestoreDatabaseId);

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const db =
    firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);

  // 1. Singletons
  console.log('Uploading site_settings...');
  await setDoc(doc(db, 'site_settings', 'main'), cleanForFirestore(initialSiteSettings));
  console.log('✓ site_settings uploaded');

  console.log('Uploading hero_data...');
  await setDoc(doc(db, 'hero_data', 'main'), cleanForFirestore(initialHeroData));
  console.log('✓ hero_data uploaded');

  console.log('Uploading about_data...');
  await setDoc(doc(db, 'about_data', 'main'), cleanForFirestore(initialAboutData));
  console.log('✓ about_data uploaded');

  // 2. Collections
  const collections = [
    { name: 'projects', items: initialProjects },
    { name: 'skills', items: initialSkills },
    { name: 'services', items: initialServices },
    { name: 'experiences', items: initialExperiences },
    { name: 'education', items: initialEducation },
    { name: 'process_steps', items: initialProcessSteps },
    { name: 'testimonials', items: initialTestimonials },
    { name: 'stats', items: initialStats },
    { name: 'achievements', items: initialAchievements },
    { name: 'faqs', items: initialFaqs },
    { name: 'cv_versions', items: initialCvVersions },
    { name: 'media_items', items: initialMediaItems },
  ];

  let totalDocs = 3; // 3 singletons

  for (const col of collections) {
    console.log(`Uploading ${col.name} (${col.items.length} items)...`);
    await Promise.all(
      col.items.map((item) =>
        setDoc(doc(db, col.name, (item as { id: string }).id), cleanForFirestore(item))
      )
    );
    console.log(`✓ ${col.name} uploaded (${col.items.length} items)`);
    totalDocs += col.items.length;
  }

  console.log(`\n🎉 SUCCESS! All data (${totalDocs} documents) uploaded completely to Firestore!`);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Data upload error:', err);
  process.exit(1);
});
