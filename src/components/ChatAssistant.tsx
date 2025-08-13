"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const PORTFOLIO_KNOWLEDGE = {
  skills: ['Web Development', 'Graphics Design', '3D Visualization', 'UI/UX Design', 'Frontend Development', 'Brand Identity', 'Creative Direction'],
  technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Supabase', 'Adobe Creative Suite', 'Figma', 'Blender'],
  services: ['Web Design & Development', 'Brand Identity Design', 'UI/UX Design', '3D Modeling & Animation', 'Logo Design', 'Motion Graphics', 'Digital Strategy'],
  experience: '5+ years',
  specialties: ['Creative Development', 'Digital Design', 'Interactive Experiences', 'Brand Strategy'],
  approach: 'I bridge the gap between beautiful aesthetics and functional technology, creating digital solutions that captivate and convert.',
  personality: 'Creative, detail-oriented, and passionate about pushing design boundaries'
};

const QUICK_RESPONSES = [
  "What services do you offer?",
  "What technologies do you use?",
  "Tell me about your experience",
  "How can I contact you?",
  "Show me your projects",
  "What's your design process?",
  "Do you work with startups?",
  "What makes you different?",
  "Can you help with branding?"
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialMessageAdded, setInitialMessageAdded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Add initial message only on client-side to avoid hydration mismatch
    if (!initialMessageAdded) {
      setMessages([{
        id: '1',
        text: "Hello! I'm NA-TI's AI assistant. I can answer questions about my portfolio, skills, and services. How can I help you today?",
        sender: 'assistant',
        timestamp: new Date()
      }]);
      setInitialMessageAdded(true);
    }
  }, [initialMessageAdded]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Services and offerings
    if (message.includes('service') || message.includes('offer') || message.includes('do')) {
      return `I offer comprehensive digital services:\n\n• ${PORTFOLIO_KNOWLEDGE.services.join('\n• ')}\n\n${PORTFOLIO_KNOWLEDGE.approach}\n\nEach project is tailored to your unique needs and goals. Which service interests you most?`;
    }
    
    // Technologies and tools
    if (message.includes('technology') || message.includes('tech') || message.includes('stack') || message.includes('tool')) {
      return `My tech stack includes:\n\n• ${PORTFOLIO_KNOWLEDGE.technologies.join('\n• ')}\n\nI choose the right tools for each project to ensure optimal performance and maintainability. Are you curious about any specific technology?`;
    }
    
    // Skills and expertise
    if (message.includes('skill') || message.includes('expertise') || message.includes('ability')) {
      return `My expertise spans:\n\n• ${PORTFOLIO_KNOWLEDGE.skills.join('\n• ')}\n\nI'm ${PORTFOLIO_KNOWLEDGE.personality}. My strength lies in combining technical proficiency with creative vision. What aspect of my work would you like to explore?`;
    }
    
    // Experience and background
    if (message.includes('experience') || message.includes('background') || message.includes('about')) {
      return `With ${PORTFOLIO_KNOWLEDGE.experience} of experience, I specialize in:\n\n• ${PORTFOLIO_KNOWLEDGE.specialties.join('\n• ')}\n\n${PORTFOLIO_KNOWLEDGE.approach}\n\nI've helped businesses of all sizes transform their digital presence. Want to see some examples?`;
    }
    
    // Design process
    if (message.includes('process') || message.includes('approach') || message.includes('workflow')) {
      return `My design process is collaborative and thorough:\n\n• Discovery & Research\n• Strategy & Planning\n• Design & Prototyping\n• Development & Testing\n• Launch & Optimization\n\nI believe in involving clients throughout the journey to ensure the final product exceeds expectations. Would you like to discuss your project requirements?`;
    }
    
    // Startups and business types
    if (message.includes('startup') || message.includes('small business') || message.includes('enterprise')) {
      return `Absolutely! I work with businesses of all sizes:\n\n• Startups looking to establish their digital presence\n• Small businesses needing a competitive edge\n• Enterprises requiring scalable solutions\n\nI understand the unique challenges each faces and tailor my approach accordingly. What stage is your business at?`;
    }
    
    // Branding and identity
    if (message.includes('brand') || message.includes('identity') || message.includes('logo')) {
      return `Yes! Brand identity is one of my core specialties:\n\n• Logo design and visual identity\n• Brand strategy and positioning\n• Style guides and brand systems\n• Digital brand experiences\n\nI help businesses create memorable, authentic brands that resonate with their audience. Do you have a brand project in mind?`;
    }
    
    // What makes different/unique
    if (message.includes('different') || message.includes('unique') || message.includes('special')) {
      return `What sets me apart:\n\n• Technical + Creative: I code AND design\n• Full-stack thinking: From concept to deployment\n• User-centered approach: Design with purpose\n• Cultural perspective: Global design sensibility\n• Continuous learning: Always adopting new technologies\n\n${PORTFOLIO_KNOWLEDGE.approach}\n\nI don't just create websites or graphics—I create experiences that drive results.`;
    }
    
    // Contact and hiring
    if (message.includes('contact') || message.includes('reach') || message.includes('hire') || message.includes('work together')) {
      return `I'd love to collaborate with you! Here's how to get started:\n\n• Use the Contact form on this site\n• Connect on LinkedIn or other social platforms\n• Schedule a discovery call to discuss your project\n\nI'm currently accepting new projects and typically respond within 24 hours. What's your timeline looking like?`;
    }
    
    // Projects and portfolio
    if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
      return `Check out my Projects section to see my latest work:\n\n• Responsive web applications\n• Brand identity systems\n• UI/UX design projects\n• 3D visualizations and animations\n• Motion graphics and interactions\n\nEach project tells a story of problem-solving and creative innovation. Which type of project are you most interested in?`;
    }
    
    // Pricing and budget
    if (message.includes('price') || message.includes('cost') || message.includes('budget') || message.includes('rate')) {
      return `Investment varies based on project scope:\n\n• Logo design: Starting from competitive rates\n• Website development: Scalable pricing\n• Brand identity: Comprehensive packages\n• Consultation: Free initial discovery call\n\nI believe in transparent pricing and provide detailed proposals. What's your project budget range?`;
    }
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('greetings')) {
      return `Hello there! 👋 Welcome to my portfolio!\n\nI'm NA-TI's AI assistant, here to help you learn about my creative work and services. I can answer questions about:\n\n• Design and development services\n• Past projects and case studies\n• Technologies and processes\n• Collaboration opportunities\n\nWhat would you like to explore first?`;
    }
    
    // Thanks
    if (message.includes('thank') || message.includes('thanks')) {
      return `You're very welcome! 😊\n\nI'm here whenever you need assistance. Feel free to ask more questions about NA-TI's work, or reach out directly through the contact form when you're ready to start your project.\n\nIs there anything else you'd like to know?`;
    }
    
    // Default response with more personality
    return `That's an interesting question! 🤔\n\nI can help you discover:\n\n• Creative services and expertise\n• Technologies and design processes\n• Project examples and case studies\n• Collaboration opportunities\n• Pricing and project timelines\n\nFeel free to ask me anything about NA-TI's work, or use one of the quick questions below to get started!`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500); // Fixed 1.5 second delay
  };

  const handleQuickResponse = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12"/>
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M8 10h.01M12 10h.01M16 10h.01"/>
            </motion.svg>
          )}
        </AnimatePresence>
        
        {/* Notification dot for new users */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            !
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 left-6 z-40 w-80 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <h3 className="font-semibold">NA-TI Assistant</h3>
                  <p className="text-xs opacity-80">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-white/70' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <LoadingSpinner variant="ghost" size="sm" />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Responses */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
                <div className="space-y-1">
                  {QUICK_RESPONSES.slice(0, 3).map((question) => (
                    <button
                      key={question}
                      onClick={() => handleQuickResponse(question)}
                      className="w-full text-left text-xs p-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 