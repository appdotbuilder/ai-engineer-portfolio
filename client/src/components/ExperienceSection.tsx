
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Experience } from '../../../server/src/schema';

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  // STUB: Using placeholder data since handlers return empty array
  const displayExperience = experience.length > 0 ? experience : [
    {
      id: 1,
      company: "AI Innovations Corp",
      position: "Senior AI Engineer",
      description: "Led the development of cutting-edge machine learning models for computer vision applications. Architected scalable ML pipelines processing millions of images daily. Mentored junior engineers and established best practices for MLOps.",
      start_date: new Date('2022-01-01'),
      end_date: null,
      location: "San Francisco, CA",
      technologies: ["Python", "TensorFlow", "PyTorch", "Kubernetes", "AWS"],
      display_order: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      company: "Neural Dynamics Inc",
      position: "Machine Learning Engineer",
      description: "Developed and deployed deep learning models for natural language processing. Built recommendation systems serving 10M+ users. Optimized model performance reducing inference time by 60%.",
      start_date: new Date('2020-03-01'),
      end_date: new Date('2021-12-31'),
      location: "Remote",
      technologies: ["Python", "Transformers", "Docker", "GCP", "Spark"],
      display_order: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      company: "TechStart Solutions",
      position: "Data Scientist",
      description: "Applied statistical modeling and machine learning to solve business problems. Created predictive models that increased revenue by 25%. Collaborated with cross-functional teams to deliver data-driven insights.",
      start_date: new Date('2018-06-01'),
      end_date: new Date('2020-02-29'),
      location: "New York, NY",
      technologies: ["Python", "R", "SQL", "Tableau", "Scikit-learn"],
      display_order: 3,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getDateRange = (startDate: Date, endDate: Date | null) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              🌟 Experience Journey
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Building the future, one algorithm at a time
            </p>
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
              <span>🚀</span>
              <span>Navigate through my professional voyage</span>
              <span>🛰️</span>
            </div>
          </div>

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {displayExperience.map((exp: Experience, index: number) => (
              <Card 
                key={exp.id} 
                className="experience-card bg-gray-900/50 border-gray-700 hover:border-purple-500 transition-all duration-300 glow-purple h-full flex flex-col"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white flex items-center mb-2">
                          <span className="mr-2 text-2xl">{index === 0 ? '🚀' : index === 1 ? '⚡' : '🔬'}</span>
                          <span className="leading-tight">{exp.position}</span>
                        </CardTitle>
                        <p className="text-lg text-blue-400 font-semibold">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-gray-300 font-medium text-sm">
                          {getDateRange(exp.start_date, exp.end_date)}
                        </p>
                        {exp.location && (
                          <p className="text-gray-400 text-xs mt-1">
                            📍 {exp.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-gray-300 leading-relaxed text-base flex-1">
                    {exp.description}
                  </p>
                  
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.map((tech: string, techIndex: number) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary" 
                          className="bg-purple-950/50 text-purple-300 border-purple-700 text-xs px-2 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {displayExperience.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛰️</div>
              <p className="text-xl text-gray-400">Experience data incoming from deep space...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
