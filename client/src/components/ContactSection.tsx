
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import type { ContactInfo } from '../../../server/src/schema';

interface ContactSectionProps {
  contactInfo: ContactInfo | null;
}

export function ContactSection({ contactInfo }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // STUB: Using placeholder data since handlers return null
  const displayContactInfo = contactInfo || {
    email: "contact@aiportfolio.dev",
    phone: "+1 (555) 123-4567",
    linkedin_url: "https://linkedin.com/in/ai-engineer",
    github_url: "https://github.com/ai-engineer",
    twitter_url: "https://twitter.com/ai_engineer",
    location: "San Francisco, CA"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // STUB: Simulating form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Message sent! 🚀 I\'ll get back to you soon from the digital cosmos.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: displayContactInfo.github_url,
      icon: '🐙',
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      url: displayContactInfo.linkedin_url,
      icon: '💼',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      url: displayContactInfo.twitter_url,
      icon: '🐦',
      color: 'hover:text-cyan-400'
    }
  ].filter(link => link.url);

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              🚀 Launch Communication
            </h2>
            <p className="text-xl text-gray-300">
              Ready to collaborate on the next big AI breakthrough?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-700 glow-blue">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <span className="mr-3">📡</span>
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">📧</div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a 
                        href={`mailto:${displayContactInfo.email}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {displayContactInfo.email}
                      </a>
                    </div>
                  </div>

                  {displayContactInfo.phone && (
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">📱</div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <a 
                          href={`tel:${displayContactInfo.phone}`}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {displayContactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {displayContactInfo.location && (
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">📍</div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-gray-200">{displayContactInfo.location}</p>
                      </div>
                    </div>
                  )}

                  {socialLinks.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm mb-4">Connect on social</p>
                      <div className="flex space-x-4">
                        {socialLinks.map((link) => (
                          <Button
                            key={link.name}
                            asChild
                            variant="outline"
                            size="sm"
                            className={`border-gray-600 text-gray-300 ${link.color} hover:bg-gray-800`}
                          >
                            <a href={link.url!} target="_blank" rel="noopener noreferrer">
                              <span className="mr-2">{link.icon}</span>
                              {link.name}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-gray-900/50 border-gray-700 glow-purple">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <span className="mr-3">💌</span>
                    Send Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        required
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        required
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      />
                    </div>
                    
                    <div>
                      <Textarea
                        placeholder="Your message about the next AI revolution..."
                        value={formData.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setFormData((prev) => ({ ...prev, message: e.target.value }))
                        }
                        required
                        rows={6}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 glow-purple"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Transmitting...
                        </>
                      ) : (
                        <>
                          🚀 Launch Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              Made with 💙 and cosmic inspiration • © 2024 AI Portfolio
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Powered by the latest in space-age technology 🛸
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
