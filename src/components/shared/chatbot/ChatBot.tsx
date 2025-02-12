"use client"
import { IInstruction, instructions } from '@/constant/chat';
import { useAppDispatch } from '@/redux/hook';
import { useAppSelector } from '@/redux/hook';
import { clearNotification } from '@/redux/slices/notificationSlice/notificationSlice';
import { Cross, HelpCircle } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { X } from 'lucide-react';
import { Bot } from 'lucide-react';
import { FC, useEffect, useState } from 'react';


const ChatBot: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeInstruction, setActiveInstruction] = useState<IInstruction | null>(null);
    const { notification, isShow } = useAppSelector(state => state.notificationSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isShow) {
            setTimeout(() => {
                dispatch(clearNotification());
            }, 3000);
        }
    }, [isShow, dispatch]);



    return (
        <div className="fixed bottom-2 md:bottom-6 right-2 md:right-6 z-50">
            {/* {
                isShow && (
                    <div className="mb-4 animate-slide-up">
                        <div className="relative bg-white rounded-lg shadow-lg p-4 w-[320px] border border-gray-100">
                            <button
                                onClick={() => dispatch(clearNotification())}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="flex items-start gap-3">
                                <div className="pt-1">
                                    <p className="text-sm text-gray-600 mt-1">
                                        {notification}
                                    </p>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
                        </div>
                    </div>
                )
            } */}
            <div className='flex items-start justify-end'>
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group relative"
                    >
                        <Bot className="size-7 group-hover:animate-bounce" />
                    </button>
                )}
            </div>
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-xl w-[300px] max-h-[400px] flex flex-col animate-slide-up border-secondary/10">
                    <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-t-xl flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Bot className="size-7 animate-pulse" />
                            <span className="font-medium">Helpful Guide ✨</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-primary/20 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 thin-scrollbar">
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