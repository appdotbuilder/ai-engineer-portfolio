
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">
            🚀 AI Portfolio
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-blue-400 hover:bg-blue-950/20"
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('projects')}
              className="text-gray-300 hover:text-blue-400 hover:bg-blue-950/20"
            >
              Projects
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('experience')}
              className="text-gray-300 hover:text-blue-400 hover:bg-blue-950/20"
            >
              Experience
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('skills')}
              className="text-gray-300 hover:text-blue-400 hover:bg-blue-950/20"
            >
              Skills
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-blue-400 hover:bg-blue-950/20"
            >
              Contact
            </Button>
          </div>

          <Button
            variant="ghost"
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-2 pt-4">
              <Button
                variant="ghost"
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-blue-400 hover:bg-blue-950/20 justify-start"
              >
                About
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('projects')}
                className="text-gray-300 hover:text-blue-400 hover:bg-blue-950/20 justify-start"
              >
                Projects
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('experience')}
                className="text-gray-300 hover:text-blue-400 hover:bg-blue-950/20 justify-start"
              >
                Experience
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('skills')}
                className="text-gray-300 hover:text-blue-400 hover:bg-blue-950/20 justify-start"
              >
                Skills
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-blue-400 hover:bg-blue-950/20 justify-start"
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
