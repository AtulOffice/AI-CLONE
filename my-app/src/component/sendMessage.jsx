import React from 'react'
import { Send } from 'lucide-react';

const SendMessage = ({ message, setMessage, handlesendMessage, theme, aiIsthinking }) => {
    const isDark = theme === 'dark';

    return (
        <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        value={message}
                        disabled={aiIsthinking}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handlesendMessage();
                            }
                        }}
                        placeholder={!aiIsthinking ? "Ask anything" : "AI is thinking"}
                        className={`w-full pl-6 pr-20 py-4 rounded-full focus:outline-none ${isDark
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-400'
                            }`}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                        <button
                            onClick={handlesendMessage}
                            className={`p-2 rounded-full transition-colors ${isDark
                                ? 'bg-white text-black hover:bg-gray-200'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMessage