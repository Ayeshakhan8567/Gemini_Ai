import { createContext, useState } from "react";
import runChat from "../config/gemini.js";


export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentprompt, setRecentPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // Running dialogue array for active screen
  const [allChats, setAllChats] = useState([]);       // Global array tracking historical saved sessions
  const [currentChatId, setCurrentChatId] = useState(null); // Active session identifier tracking anchor
  const [showresult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [resultdata, setResultData] = useState("");
  const [search, setSearch] = useState(true);
  const [searchWord, setSearchWord] = useState("");
  const [isListening, setIsListening] = useState(false);
 

     
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 40 * index);
  };

  const searchFunct = () => {
    setLoading(false);
    setSearch(false);
    setShowResult(true);
    setInput("");
    setRecentPrompt("");
    setResultData("");
  };

  const newChat = () => {
    setLoading(false);
    setSearch(true);
    setSearchWord("");
    setShowResult(true);
    setInput("");
    setRecentPrompt("");
    setResultData("");
    setChatHistory([]); 
    setCurrentChatId(null); // Clear active tracking token for fresh session creation passes
  };

  const onSent = async (prompt) => {
    setLoading(true);
    setShowResult(false);
    setResultData(""); // Wipe out active typing buffer instantly

    const userPrompt = prompt || input;
    setRecentPrompt(userPrompt);
    setInput(""); 

    // 1. Compile prior conversation stream using CLEAN raw text instead of HTML string dumps
    let conversationContext = "";
    chatHistory.forEach((chat) => {
      conversationContext += `User: ${chat.prompt}\nModel: ${chat.responseRaw}\n`;
    });
    conversationContext += `User: ${userPrompt}`;

    // Pass the clean text timeline straight to Gemini API
    const response = await runChat(conversationContext);

    // 2. Format HTML highlights safely
    let responseArray = response.split("**");
    let formattedResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 1) {
        formattedResponse += "<b>" + responseArray[i] + "</b>";
      } else {
        formattedResponse += responseArray[i];
      }
    }
    let finalHTMLResponse = formattedResponse.split("*").join("<br/>");

    // 3. Assemble new sequence data block 
    const newHistoryItem = {
      prompt: userPrompt,
      responseFormatted: finalHTMLResponse,
      responseRaw: response // Kept perfectly clean for the next API context call
    };

    const updatedHistory = [...chatHistory, newHistoryItem];
    setChatHistory(updatedHistory);

    // 4. Session History Persistence (Locks the first prompt as the title)
    let chatId = currentChatId;
    if (!chatId) {
      chatId = Date.now().toString(); // Generate unique session ID key string
      setCurrentChatId(chatId);
      
      setAllChats((prev) => [
        ...prev,
        {
          id: chatId,
          title: userPrompt, // Saves your very first prompt permanently as the sidebar title
          messages: updatedHistory
        }
      ]);
    } else {
      // If conversation is already active, append message frame pairs underneath the existing id matching track
      setAllChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, messages: updatedHistory } : chat
        )
      );
    }

    // Trigger sequential typing word animation
    let newResponseArray = finalHTMLResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      delayPara(i, newResponseArray[i] + " ");
    }

    setLoading(false);
  };

  // Function helper logic to reload historical conversation traces from sidebar menu targets
  const loadPastChat = (id) => {
  const targetChat = allChats.find((c) => c.id === id);

  if (targetChat) {
    setCurrentChatId(targetChat.id);
    setChatHistory(targetChat.messages);

    const lastMessage =
      targetChat.messages[targetChat.messages.length - 1];

    setRecentPrompt(lastMessage.prompt);
    setResultData(lastMessage.responseFormatted);

    setShowResult(false);
    setSearch(true);
    setSearchWord("");
  }
};

  const contextValue = {
    input,
    setInput,
    recentprompt,
    setRecentPrompt,
    chatHistory,
    setChatHistory,
    allChats,
    loadPastChat,
    showresult,
    setShowResult,
    loading,
    resultdata,
    setResultData,
    onSent,
    newChat,
    search,
    setSearch,
    searchFunct,
    searchWord,
    setSearchWord,
    isListening,
    setIsListening,
    
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;