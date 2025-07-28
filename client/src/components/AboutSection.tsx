
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AboutMe } from '../../../server/src/schema';

interface AboutSectionProps {
  aboutMe: AboutMe | null;
}

export function AboutSection({ aboutMe }: AboutSectionProps) {
  // Always show content - use placeholder when backend data is not available
  const displayData = aboutMe || {
    id: 1,
    title: "AI Engineer & Machine Learning Specialist",
    description: "Passionate about pushing the boundaries of artificial intelligence and creating innovative solutions that make a real impact. With expertise in deep learning, computer vision, and natural language processing, I transform complex problems into elegant AI-powered solutions.",
    profile_image_url: null,
    resume_url: null,
    created_at: new Date(),
    updated_at: new Date()
  };

  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Hello, Universe! 🌌
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              {displayData.title}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-700 glow-blue">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-blue-400 mb-4 flex items-center">
                    <span className="mr-3">🤖</span>
                    About Me
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {displayData.description}
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-blue-950/50 text-blue-300 border-blue-700 px-4 py-2 text-sm">
                  🧠 Deep Learning
                </Badge>
                <Badge variant="secondary" className="bg-purple-950/50 text-purple-300 border-purple-700 px-4 py-2 text-sm">
                  👁️ Computer Vision
                </Badge>
                <Badge variant="secondary" className="bg-cyan-950/50 text-cyan-300 border-cyan-700 px-4 py-2 text-sm">
                  💬 NLP
                </Badge>
                <Badge variant="secondary" className="bg-green-950/50 text-green-300 border-green-700 px-4 py-2 text-sm">
                  🚀 MLOps
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4">
                {displayData.resume_url && (
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 glow-blue text-white px-6 py-3"
                  >
                    <a href={displayData.resume_url} target="_blank" rel="noopener noreferrer">
                      📄 Download Resume
                    </a>
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-blue-500 text-blue-400 hover:bg-blue-950/20 px-6 py-3"
                >
                  🚀 Let's Connect
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                {displayData.profile_image_url ? (
                  <img
                    src={displayData.profile_image_url}
                    alt="Profile"
                    className="w-80 h-80 object-cover rounded-full border-4 border-blue-500 glow-blue"
                  />
                ) : (
                  <div className="w-80 h-80 bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900 rounded-full border-4 border-blue-500 glow-blue flex items-center justify-center">
                    <div className="text-8xl">🤖</div>
                  </div>
                )}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl animate-bounce">
                  ⭐
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
