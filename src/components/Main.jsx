import { assets } from "../assets/assets.js";
import { Context } from "../context/context.jsx";
import React, { useContext, useRef } from "react";

const Main = () => {
  // Pulled in allChats and loadPastChat to replace single chat query loops
  const {
    onSent,
    input,
    setInput,
    search,
    searchWord,
    setSearchWord,
    allChats,
    loadPastChat,
    isListening,
    setIsListening,
    createImage,
    imageUrl
  } = useContext(Context);

  // Filter global sessions list matching searchWord in real-time by their custom Titles
  const filteredChats = allChats ? allChats.filter((item) =>
    item.title.toLowerCase().includes(searchWord.toLowerCase())
  ) : [];

  // Handle choosing a past continuous chat thread from the dropdown selection list
  const selectChat = (chat) => {
    loadPastChat(chat.id); // Loads the whole history of that conversation thread onto the screen
    setSearchWord("");     // Clear search word after selection to close the dropdown window wrapper
  };

  const recognitionRef = useRef(null);
  
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition is not supported.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new window.webkitSpeechRecognition();

      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.log("Speech Error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    setIsListening(true);
    recognitionRef.current.start();
  };

  return (
    search ? (
        /* Regular Chat Input Bar - Active when search is true */
        <div className="flex  max-w-5xl h-16  lg:gap-28  items-center px-5 rounded-full transition-all duration-300 shadow-[0_0_200px_rgba(14,165,233,0.55)]  hover:-translate-y-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200  ">
          <div className="flex items-center gap-2 md:gap-3 lg:gap-5">
            {/* Plus Button - Added hover scale and smooth active pop */}
            <div className="flex justify-center items-center w-13 h-10 rounded-full hover:bg-pink-300/60 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95">
              <img
                src={assets.plus_icon}
                alt=""
                className="w-7 h-7"
              />
            </div>
            <input
              type="text"
              placeholder="Ask Gemini"
              value={input} 
              className="outline-none w-full bg-transparent placeholder-gray-500 text-gray-800"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSent()} 
            />
          </div>

          <div className="flex gap-1 lg:gap-3">
            {/* Mic Button - Added conditional glowing indicator & smooth micro-interactions */}
            <div
              onClick={startListening}
              className={`flex justify-center items-center w-10 h-10 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${
                isListening 
                  ? "bg-red-100 animate-pulse ring-4 ring-red-500/20" 
                  : "hover:bg-pink-300/60"
              }`}
            >
              <img
                src={assets.mic_icon}
                className={`w-7 h-7 transition-transform ${isListening ? "scale-110" : ""}`}
                alt="mic"
              />
            </div>

            {/* Send Button - Added clean interactive hover behavior */}
            <div
              onClick={() => onSent()}
              className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-pink-300/60 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <img
                src={assets.send_icon}
                alt=""
                className="w-6 h-6 transform hover:translate-x-0.5 transition-transform duration-200"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Search Input Bar & Live Dropdown Layout Wrapper - Active when search is false */
        <div className="relative">
          <div className="flex bg-amber-100 w-[600px] h-16 justify-between items-center px-5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl">
            <div className="flex items-center gap-5">
              {/* Search Icon Button */}
              <div className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-amber-200/60 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95">
                <img
                  src={assets.searchIcon}
                  alt=""
                  className="w-7 h-7"
                />
              </div>
              <input
                type="text"
                placeholder="Search chats..."
                value={searchWord} 
                className="outline-none w-[300px] bg-transparent placeholder-gray-500 text-gray-800"
                onChange={(e) => setSearchWord(e.target.value)}
              />
            </div>
          </div>

          {/* Real-time Matching Dropdown List - Enhanced backdrop slide down effect */}
          {searchWord.trim() !== "" && (
            <div className="absolute left-0 right-0 top-[72px] bg-white border border-gray-100 rounded-2xl shadow-xl max-h-60 overflow-y-auto z-50 flex flex-col p-2 gap-1 mx-4 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
              {filteredChats.length > 0 ? (
                filteredChats.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => selectChat(item)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50/80 rounded-xl cursor-pointer transition-all duration-150 transform hover:translate-x-1"
                  >
                    <img src={assets.message_icon || assets.searchIcon} alt="" className="w-5 h-5 opacity-60" />
                    <p className="text-sm text-gray-700 truncate w-full font-medium">{item.title}</p>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 p-4 text-center italic">
                  No matching chats found
                </div>
              )}
            </div>
          )}
        </div>
      )
   
  );
};

export default Main;
