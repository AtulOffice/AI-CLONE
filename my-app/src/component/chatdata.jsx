import React from 'react'

const Chatdata = ({ currentChat, theme }) => {
    const isDark = theme === 'dark';
    const formatAnswer = (text) => {
        if (!text) return null;

        const lines = text.split('\n');
        const elements = [];
        let currentList = [];
        let listType = null;

        lines.forEach((line, idx) => {
            const trimmedLine = line.trim();
            const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
            const bulletMatch = trimmedLine.match(/^[*-]\s+(.+)/);

            if (numberedMatch) {
                if (listType !== 'numbered') {
                    if (currentList.length > 0) {
                        elements.push(createList(currentList, listType));
                        currentList = [];
                    }
                    listType = 'numbered';
                }
                currentList.push(numberedMatch[2]);
            } else if (bulletMatch) {
                if (listType !== 'bullet') {
                    if (currentList.length > 0) {
                        elements.push(createList(currentList, listType));
                        currentList = [];
                    }
                    listType = 'bullet';
                }
                currentList.push(bulletMatch[1]);
            } else {
                if (currentList.length > 0) {
                    elements.push(createList(currentList, listType));
                    currentList = [];
                    listType = null;
                }

                if (trimmedLine) {
                    elements.push(
                        <p key={`p-${idx}`} className="mb-3 leading-relaxed">
                            {formatBoldText(trimmedLine)}
                        </p>
                    );
                } else {
                    elements.push(<div key={`space-${idx}`} className="h-2"></div>);
                }
            }
        });
        if (currentList.length > 0) {
            elements.push(createList(currentList, listType));
        }

        return elements;
    };

    const createList = (items, type) => {
        const ListTag = type === 'numbered' ? 'ol' : 'ul';
        const listClass = type === 'numbered'
            ? 'list-decimal list-inside space-y-2 mb-4 ml-2'
            : 'list-disc list-inside space-y-2 mb-4 ml-2';

        return (
            <ListTag key={`list-${Math.random()}`} className={listClass}>
                {items.map((item, idx) => (
                    <li key={idx} className="leading-relaxed pl-2">
                        {formatBoldText(item)}
                    </li>
                ))}
            </ListTag>
        );
    };

    const formatBoldText = (text) => {
        const boldPattern = /\*\*([^*]+)\*\*/g;
        const parts = text.split(boldPattern);

        return parts.map((part, idx) => {
            if (idx % 2 === 1) {
                return <strong key={idx} className="font-semibold">{part}</strong>;
            }
            return <span key={idx}>{part}</span>;
        });
    };

    return (
        <>
            <div className="flex-1 overflow-y-auto p-6 scrollbar-custom sidebar">
                {((!currentChat && !currentChat?.messages) || currentChat?.messages?.length === 0) ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <h2 className={`text-4xl font-light mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                What can I help with?
                            </h2>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {currentChat?.messages && currentChat?.messages.map((msg, idx) => (
                            <div key={idx} className="space-y-4">

                                <div className="flex justify-end">
                                    <div className={`p-4 rounded-2xl max-w-3xl ml-auto shadow-md ${isDark
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white'
                                        }`}>
                                        <p className="leading-relaxed">{msg.question}</p>
                                    </div>
                                </div>
                                <div className="flex justify-start">
                                    <div className={`p-5 rounded-2xl max-w-3xl shadow-md ${isDark
                                        ? 'bg-gray-700 text-white'
                                        : 'bg-gray-200 text-gray-900'
                                        }`}>
                                        <div className="text-sm">
                                            {formatAnswer(msg.answer)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Chatdata;