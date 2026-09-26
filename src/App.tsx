/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Preloader } from './components/layout/Preloader';
import { CustomCursor } from './components/layout/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/layout/CommandPalette';
import { ToastContainer } from './components/layout/ToastContainer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { DynamicSeoManager } from './components/layout/DynamicSeoManager';

// Public Page Sections
import { HeroSection } from './components/public/HeroSection';
import { QuickValueSection } from './components/public/QuickValueSection';
import { StatsSection } from './components/public/StatsSection';
import { ArchitectureVisualSection } from './components/public/ArchitectureVisualSection';
import { AboutSection } from './components/public/AboutSection';
import { SkillsSection } from './components/public/SkillsSection';
import { ExperienceSection } from './components/public/ExperienceSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { ServicesSection } from './components/public/ServicesSection';
import { ProcessSection } from './components/public/ProcessSection';
import { WhyWorkWithMe } from './components/public/WhyWorkWithMe';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { ContactSection } from './components/public/ContactSection';

// Dedicated Route / Modal Views
import { ProjectCaseStudyModal } from './components/modals/ProjectCaseStudyModal';
import { SkillDetailModal } from './components/modals/SkillDetailModal';
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { CvDownloadModal } from './components/modals/CvDownloadModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AiAssistantCenter } from './components/public/AiAssistantCenter';
import { AiCenterSearchBar } from './components/public/AiCenterSearchBar';

const MainRouter: React.FC = () => {
  const { currentRoute } = useData();

  if (currentRoute === 'admin') {
    return <AdminDashboard />;
  }

  if (currentRoute === 'ai-assistant') {
    return (
      <>
        <Navbar />
        <AiAssistantCenter />
        <Footer />
      </>
    );
  }

  if (currentRoute === 'project-detail') {
    return (
      <>
        <Navbar />
        <ProjectCaseStudyModal />
        <Footer />
      </>
    );
  }

  if (currentRoute === 'skill-detail') {
    return (
      <>
        <Navbar />
        <SkillDetailModal />
        <Footer />
      </>
    );
  }

  if (currentRoute === 'service-detail') {
    return (
      <>
        <Navbar />
        <ServiceDetailModal />
        <Footer />
      </>
    );
  }

  // Default: Primary Public Portfolio Experience
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AiCenterSearchBar />
        <QuickValueSection />
        <StatsSection />
        <ArchitectureVisualSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <WhyWorkWithMe />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <DataProvider>
      <DynamicSeoManager />
      <div className="min-h-screen bg-[#080706] text-[#f3d5b5] font-sans selection:bg-[#c87a3e]/30 selection:text-[#f3d5b5] relative">
        <Preloader />
        <ScrollProgress />
        <CustomCursor />
        <CommandPalette />
        <ToastContainer />
        <CvDownloadModal />
        <MainRouter />
      </div>
    </DataProvider>
  );
}
