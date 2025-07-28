
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Skill } from '../../../server/src/schema';

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  // STUB: Using placeholder data since handlers return empty array
  const displaySkills = skills.length > 0 ? skills : [
    {
      id: 1,
      name: "Python",
      category: "Programming Languages",
      proficiency_level: 5,
      display_order: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: "Machine Learning",
      category: "AI/ML",
      proficiency_level: 5,
      display_order: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: "Deep Learning",
      category: "AI/ML",
      proficiency_level: 5,
      display_order: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: "PyTorch",
      category: "Frameworks",
      proficiency_level: 5,
      display_order: 4,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      name: "TensorFlow",
      category: "Frameworks",
      proficiency_level: 4,
      display_order: 5,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 6,
      name: "Computer Vision",
      category: "AI/ML",
      proficiency_level: 4,
      display_order: 6,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 7,
      name: "Natural Language Processing",
      category: "AI/ML",
      proficiency_level: 4,
      display_order: 7,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 8,
      name: "JavaScript",
      category: "Programming Languages",
      proficiency_level: 4,
      display_order: 8,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 9,
      name: "Docker",
      category: "DevOps",
      proficiency_level: 4,
      display_order: 9,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 10,
      name: "Kubernetes",
      category: "DevOps",
      proficiency_level: 3,
      display_order: 10,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 11,
      name: "AWS",
      category: "Cloud",
      proficiency_level: 4,
      display_order: 11,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 12,
      name: "SQL",
      category: "Databases",
      proficiency_level: 4,
      display_order: 12,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  // Group skills by category
  const skillsByCategory = displaySkills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'AI/ML': '🤖',
      'Programming Languages': '💻',
      'Frameworks': '⚡',
      'DevOps': '🚀',
      'Cloud': '☁️',
      'Databases': '🗄️',
      'Tools': '🛠️'
    };
    return icons[category] || '🔧';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'AI/ML': 'blue',
      'Programming Languages': 'purple',
      'Frameworks': 'cyan',
      'DevOps': 'green',
      'Cloud': 'yellow',
      'Databases': 'orange',
      'Tools': 'pink'
    };
    return colors[category] || 'gray';
  };

  const getSkillIcon = (skillName: string) => {
    const skillIcons: Record<string, string> = {
      // Programming Languages
      'Python': '🐍',
      'JavaScript': '🟨',
      'TypeScript': '🔵',
      'Java': '☕',
      'C++': '⚙️',
      'Go': '🐹',
      'Rust': '🦀',
      'R': '📊',
      'SQL': '🗃️',
      
      // AI/ML
      'Machine Learning': '🤖',
      'Deep Learning': '🧠',
      'Computer Vision': '👁️',
      'Natural Language Processing': '💬',
      
      // Frameworks
      'PyTorch': '🔥',
      'TensorFlow': '🟠',
      'React': '⚛️',
      'Vue': '💚',
      'Angular': '🔺',
      'Django': '🎸',
      'Flask': '🌶️',
      'FastAPI': '⚡',
      
      // DevOps & Cloud
      'Docker': '🐳',
      'Kubernetes': '☸️',
      'AWS': '☁️',
      'GCP': '🌥️',
      'Azure': '🌐',
      
      // Databases
      'PostgreSQL': '🐘',
      'MongoDB': '🍃',
      'Redis': '🔴',
      
      // Tools
      'Git': '📝',
      'Linux': '🐧',
      'Tableau': '📈'
    };
    
    return skillIcons[skillName] || '⭐';
  };

  return (
    <section id="skills" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              ⚡ Skill Constellation
            </h2>
            <p className="text-xl text-gray-300">
              Technologies mastered across the digital galaxy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <Card 
                key={category} 
                className="bg-gray-900/50 border-gray-700 hover:border-cyan-500 transition-all duration-300 glow-cyan"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <span className="mr-3 text-2xl">{getCategoryIcon(category)}</span>
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categorySkills
                    .sort((a: Skill, b: Skill) => a.display_order - b.display_order)
                    .map((skill: Skill) => (
                      <div key={skill.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                        <span className="text-2xl flex-shrink-0">{getSkillIcon(skill.name)}</span>
                        <div className="flex-1">
                          <span className="text-gray-200 font-medium text-base">{skill.name}</span>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`
                            ${getCategoryColor(category) === 'blue' ? 'bg-blue-950/50 text-blue-300 border-blue-700' : ''}
                            ${getCategoryColor(category) === 'purple' ? 'bg-purple-950/50 text-purple-300 border-purple-700' : ''}
                            ${getCategoryColor(category) === 'cyan' ? 'bg-cyan-950/50 text-cyan-300 border-cyan-700' : ''}
                            ${getCategoryColor(category) === 'green' ? 'bg-green-950/50 text-green-300 border-green-700' : ''}
                            ${getCategoryColor(category) === 'yellow' ? 'bg-yellow-950/50 text-yellow-300 border-yellow-700' : ''}
                            ${getCategoryColor(category) === 'orange' ? 'bg-orange-950/50 text-orange-300 border-orange-700' : ''}
                            ${getCategoryColor(category) === 'pink' ? 'bg-pink-950/50 text-pink-300 border-pink-700' : ''}
                            text-xs px-2 py-1
                          `}
                        >
                          {category}
                        </Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {displaySkills.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌌</div>
              <p className="text-xl text-gray-400">Skills downloading from the skill matrix...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
