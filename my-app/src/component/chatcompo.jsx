import { useState, useEffect } from 'react';
import { Plus, Menu, X, Sun, Moon } from 'lucide-react';
import axios from "axios"
import Chatdata from './chatdata';
import Chathistory from './chathistory';
import SendMessage from './sendMessage';
import { toast } from "react-hot-toast";

const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [currentChat, setCurrentChat] = useState(null);
  const [MessageSentToggle, setMessageSentToggle] = useState(false);
  const [aiIsthinking, setAIisThinking] = useState(false)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_LOCAL}/allchat`);
  //       setChats(response?.data);
  //     } catch (error) {
  //       console.error("❌ Error fetching data:", error);

  //       const errorMessage =
  //         error?.response?.data?.message || "Something went wrong";

  //       toast.error(errorMessage);
  //     }
  //   };
  //   fetchData();
  // }, [MessageSentToggle]);

  // useEffect(() => {
  //   if (!activeChat) return;
  //   const chat = chats.find(chat => chat._id === activeChat);
  //   setCurrentChat(chat || null);
  // }, [chats, activeChat]);


  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCAL}/allchat`);
        setChats(response?.data);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        const errorMessage =
          error?.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
      }
    };

    if (!currentChat?._id) {
      fetchAllChats();
    }
  }, [MessageSentToggle]);


  useEffect(() => {

    if (!activeChat) return;
    const fetchSingleChat = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_LOCAL}/chat/${activeChat}`
        );
        setCurrentChat(response?.data.message);
      } catch (error) {
        console.error("❌ Error fetching single chat:", error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchSingleChat();
  }, [activeChat, MessageSentToggle]);


  const handlesendMessage = async () => {
    setAIisThinking(true)
    if (!message) {
      toast.error("please  write something in input box")
      setAIisThinking(false);
      return;
    };
    try {
      const sendMessage = message;
      setMessage("");
      const response = await axios.post(`${process.env.REACT_APP_LOCAL}/asknew`, {
        message: sendMessage,
        id: currentChat?._id || null,
      });

      setActiveChat(response?.data.id)
      setMessageSentToggle(prev => !prev);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to generate response";
      toast.error(errorMessage);
    } finally {
      setAIisThinking(false)
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  const isDark = theme === 'dark';


  return (
    <div className={`flex h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
        <div className="flex flex-col h-full p-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Generative AI</span>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentChat(null);
              setActiveChat(null)
            }}
            className={`flex items-center space-x-3 w-full p-3 mb-4 rounded-lg transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            <Plus className="w-5 h-5" />
            <span>New chat</span>
          </button>
          <div className={`border-t mb-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}></div>

          <Chathistory chats={chats} setActiveChat={setActiveChat} activeChat={activeChat} theme={theme} />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-semibold">{currentChat ? currentChat?.messages[0]?.question : 'ASK SOMETHING'}</h1>

          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <Chatdata currentChat={currentChat} theme={theme} />

        <SendMessage aiIsthinking={aiIsthinking} message={message} setMessage={setMessage} handlesendMessage={handlesendMessage} theme={theme} />
      </div>
    </div>
  );
};

export default ChatInterface;
