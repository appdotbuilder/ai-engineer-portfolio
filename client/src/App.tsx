
import { useState, useEffect, useCallback } from 'react';
import { trpc } from '@/utils/trpc';
import { Header } from '@/components/Header';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactSection } from '@/components/ContactSection';
import type { Project, Experience, Skill, AboutMe, ContactInfo } from '../../server/src/schema';
import './App.css';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [aboutMe, setAboutMe] = useState<AboutMe | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasErrors(false);
      
      // Try to fetch data, but gracefully handle failures
      const [projectsData, experienceData, skillsData, aboutData, contactData] = await Promise.all([
        trpc.getProjects.query().catch((): Project[] => []),
        trpc.getExperience.query().catch((): Experience[] => []),
        trpc.getSkills.query().catch((): Skill[] => []),
        trpc.getAboutMe.query().catch((): AboutMe | null => null),
        trpc.getContactInfo.query().catch((): ContactInfo | null => null)
      ]);
      
      setProjects(projectsData);
      setExperience(experienceData);
      setSkills(skillsData);
      setAboutMe(aboutData);
      setContactInfo(contactData);
      
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
      setHasErrors(true);
      // Continue with empty data - components will show placeholders
      setProjects([]);
      setExperience([]);
      setSkills([]);
      setAboutMe(null);
      setContactInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Show loading for a shorter time, then display content regardless
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      setIsLoading(false);
    }, 500); // Show content after 500ms regardless of API status
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading && !showContent) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        {/* Background space effect */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="stars absolute inset-0"></div>
          <div className="twinkling absolute inset-0"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="text-6xl mb-6 animate-bounce">🚀</div>
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300 text-xl mb-2">Loading portfolio...</p>
          <p className="text-gray-500 text-sm">Establishing connection to the cosmic database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background space effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="stars absolute inset-0"></div>
        <div className="twinkling absolute inset-0"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <main>
          <AboutSection aboutMe={aboutMe} />
          <ProjectsSection projects={projects} />
          <ExperienceSection experience={experience} />
          <SkillsSection skills={skills} />
          <ContactSection contactInfo={contactInfo} />
        </main>
        
        {hasErrors && (
          <div className="fixed bottom-4 right-4 bg-yellow-900/80 border border-yellow-600 text-yellow-200 px-4 py-2 rounded-lg text-sm">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              Backend offline - showing demo content
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
