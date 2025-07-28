
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '../../../server/src/schema';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Always show content - use comprehensive placeholder data when backend is not available
  const displayProjects = projects.length > 0 ? projects : [
    {
      id: 1,
      title: "Neural Network Optimizer",
      description: "Advanced deep learning framework for optimizing neural network architectures using evolutionary algorithms and automated hyperparameter tuning. Achieved 40% faster training times with 15% improved accuracy across multiple datasets.",
      technologies: ["Python", "PyTorch", "CUDA", "Docker", "MLflow"],
      repository_url: "https://github.com/example/neural-optimizer",
      demo_url: "https://demo.example.com/neural-optimizer",
      video_url: null,
      featured: true,
      display_order: 1,
      created_at: new Date('2023-10-01'),
      updated_at: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "AI-Powered Code Assistant",
      description: "Intelligent code completion and bug detection system using transformer models trained on millions of code repositories. Features real-time suggestions, security vulnerability detection, and multi-language support.",
      technologies: ["TypeScript", "Transformers", "React", "Node.js", "OpenAI API"],
      repository_url: "https://github.com/example/code-assistant",
      demo_url: null,
      video_url: "https://youtube.com/watch?v=example-video",
      featured: true,
      display_order: 2,
      created_at: new Date('2023-08-01'),
      updated_at: new Date('2023-12-20')
    },
    {
      id: 3,
      title: "Computer Vision Pipeline",
      description: "Real-time object detection and tracking system for autonomous vehicles using YOLO and Kalman filters. Processes 60 FPS with 95% accuracy in various weather conditions.",
      technologies: ["Python", "OpenCV", "TensorFlow", "ROS", "C++"],
      repository_url: "https://github.com/example/cv-pipeline",
      demo_url: "https://cv-demo.example.com",
      video_url: null,
      featured: false,
      display_order: 3,
      created_at: new Date('2023-06-01'),
      updated_at: new Date('2023-11-10')
    },
    {
      id: 4,
      title: "NLP Sentiment Analyzer",
      description: "Multi-modal sentiment analysis system combining text, audio, and visual cues for comprehensive emotion detection in social media content.",
      technologies: ["Python", "BERT", "Transformers", "FastAPI", "AWS"],
      repository_url: "https://github.com/example/sentiment-analyzer",
      demo_url: "https://sentiment.example.com",
      video_url: null,
      featured: false,
      display_order: 4,
      created_at: new Date('2023-04-01'),
      updated_at: new Date('2023-09-15')
    }
  ];

  const featuredProjects = displayProjects.filter((project: Project) => project.featured);
  const regularProjects = displayProjects.filter((project: Project) => !project.featured);

  return (
    <section id="projects" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              🛸 Featured Projects
            </h2>
            <p className="text-xl text-gray-300">
              Exploring the frontiers of AI and machine learning
            </p>
          </div>

          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-blue-400 mb-8 flex items-center">
                <span className="mr-3">⭐</span>
                Featured Work
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredProjects.map((project: Project) => (
                  <ProjectCard key={project.id} project={project} featured />
                ))}
              </div>
            </div>
          )}

          {regularProjects.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-purple-400 mb-8 flex items-center">
                <span className="mr-3">🔬</span>
                Other Projects
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularProjects.map((project: Project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card className={`bg-gray-900/50 border-gray-700 hover:border-blue-500 transition-all duration-300 ${
      featured ? 'glow-blue' : 'hover:glow-purple'
    }`}>
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center justify-between">
          <span className="flex items-center">
            {featured && <span className="mr-2">⭐</span>}
            {project.title}
          </span>
          {featured && (
            <Badge className="bg-yellow-600 text-yellow-100">Featured</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string, index: number) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-blue-950/50 text-blue-300 border-blue-700"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          <Button 
            asChild 
            size="sm" 
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
              📁 Repository
            </a>
          </Button>
          
          {project.demo_url && (
            <Button 
              asChild 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                🚀 Live Demo
              </a>
            </Button>
          )}
          
          {project.video_url && (
            <Button 
              asChild 
              size="sm" 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <a href={project.video_url} target="_blank" rel="noopener noreferrer">
                🎥 Video
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
