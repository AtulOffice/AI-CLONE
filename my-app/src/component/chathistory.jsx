
const Chathistory = ({ chats, setActiveChat, activeChat, theme }) => {
    const isDark = theme === 'dark';
    
    return (
        <div className="flex-1 overflow-y-auto scrollbar-custom">
            <div className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Chats
            </div>
            {chats.length > 0 && chats.map((chat) => (
                <div
                    key={chat?._id}
                    onClick={() => setActiveChat(chat?._id)}
                    className={`p-3 rounded-lg cursor-pointer mb-1 transition-colors truncate ${
                        activeChat === chat?._id
                            ? isDark ? 'bg-gray-700' : 'bg-gray-200'
                            : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                >
                    <div className={`text-sm text-wrap ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {chat?.messages[0]?.question}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chathistory;