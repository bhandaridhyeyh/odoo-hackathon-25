
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your ReWear assistant. I can help you find the perfect items to swap, explain how our point system works, or answer any questions about sustainable fashion. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with actual OpenAI API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('points') || input.includes('point system')) {
      return "Our point system is simple! You earn points by listing items (5-10 points) and swapping successfully (20-50 points based on item value). You can then use these points to claim items you want. Premium items cost more points, but it's all about fair value exchange!";
    } else if (input.includes('swap') || input.includes('exchange')) {
      return "Swapping is easy! Browse items you like, request a swap using your points, and once approved, you'll get shipping details. We recommend high-quality photos and honest condition descriptions to build trust in our community.";
    } else if (input.includes('sustainable') || input.includes('environment')) {
      return "ReWear helps reduce fashion waste by extending clothing lifecycles! The fashion industry is the 2nd most polluting industry globally. By swapping instead of buying new, you're reducing water usage, chemical pollution, and textile waste. Every swap makes a difference! 🌱";
    } else if (input.includes('size') || input.includes('fit')) {
      return "Finding the right fit is crucial! Check each item's detailed measurements, ask the owner questions, and read their size recommendations. Many of our community members include fit photos and detailed size notes to help you choose confidently.";
    } else if (input.includes('condition') || input.includes('quality')) {
      return "We use a 5-tier condition system: Like New, Excellent, Very Good, Good, and Fair. Each listing includes detailed photos and condition notes. Don't hesitate to ask for additional photos or details before swapping!";
    } else {
      return "Thanks for your question! I'm here to help with anything about ReWear - from how swapping works to sustainable fashion tips. You can also check our Help Center or contact our community support team for more detailed assistance. What else would you like to know?";
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all z-50 ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <CardTitle className="text-lg">ReWear Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-emerald-100">Online • Ready to help</p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.isBot ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                      {message.isBot ? (
                        <Bot className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <User className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-emerald-500 text-white'}`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about ReWear..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
