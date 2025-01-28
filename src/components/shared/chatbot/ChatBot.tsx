"use client"

import { HelpCircle } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { X } from 'lucide-react';
import { Bot } from 'lucide-react';
import { FC, useState } from 'react';

interface Instruction {
    title: string;
    content: string;
  }

const ChatBot: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeInstruction, setActiveInstruction] = useState<Instruction | null>(null);
  
    const instructions: Instruction[] = [
      {
        title: "📚 Getting Started",
        content: "Welcome to our site! Click on any section below for helpful tips and guidance."
      },
      {
        title: "🎯 How to Book",
        content: "1. Enter your suburb in the search bar\n2. Choose AUTO or MANUAL\n3. Browse available instructors\n4. Click BOOK on your preferred instructor\n5. Select your preferred date and time"
      },
      {
        title: "🌟 Choosing an Instructor",
        content: "Look for:\n• Experience years\n• Rating stars\n• Completed lessons\n• Hourly rate\n• Location proximity"
      },
      {
        title: "💳 Payment Info",
        content: "We accept:\n• Credit/Debit cards\n• PayPal\n• Direct bank transfer\n\nPayment is required at the time of booking."
      }
    ];
  
    return (
        <div className="fixed bottom-2 md:bottom-6 right-2 md:right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
                >
                    <Bot className="w-6 h-6 group-hover:animate-bounce" />
                    <span className="text-sm font-medium">Help Me! ✨</span>
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-xl w-[300px] max-h-[400px] flex flex-col animate-slide-up border-secondary/10">
                    <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-t-xl flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Bot className="w-6 h-6 animate-pulse" />
                            <span className="font-medium">Helpful Guide ✨</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-primary/20 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {activeInstruction ? (
                            <div className="space-y-4">
                                <button
                                    onClick={() => setActiveInstruction(null)}
                                    className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm"
                                >
                                    ← Back to topics
                                </button>
                                <div className="bg-purple-50 p-4 rounded-xl">
                                    <h3 className="font-medium text-lg text-primary mb-2">
                                        {activeInstruction.title}
                                    </h3>
                                    <p className="text-gray-700 whitespace-pre-line">
                                        {activeInstruction.content}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            instructions.map((instruction, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveInstruction(instruction)}
                                    className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-colors flex items-center gap-2 group"
                                >
                                    <Sparkles className="w-4 h-4 text-primary group-hover:text-primary/80" />
                                    <span className="text-primary font-medium">{instruction.title}</span>
                                </button>
                            ))
                        )}
                    </div>

                    <div className="p-3 border-t border-primary/10 bg-primary/10 rounded-b-xl">
                        <div className="flex items-center gap-2 text-sm text-primary">
                            <HelpCircle className="w-4 h-4" />
                            <span>Click any topic for detailed help!</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;