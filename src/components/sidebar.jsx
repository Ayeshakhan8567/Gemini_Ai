import React, { useState, useContext } from "react";
import { assets } from "../assets/assets.js";
import { Context } from "../context/context.jsx";

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
 
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const { 
    onSent, 
    allChats, 
    loadPastChat, 
    setRecentPrompt, 
    newChat, 
    setResultData, 
    setShowResult,
    search,
    setSearch,
    searchFunct 
  } = useContext(Context);

 
  const handleChatClick = (id) => {
    loadPastChat(id);
    setMobileOpen(false);
  };

  return (
    <>
     
      <div className="md:hidden fixed top-3 left-4 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md w-10 h-10 rounded-full shadow-sm border border-white/20 cursor-pointer active:scale-95"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <img
          src={mobileOpen ? assets.plus_icon : assets.menu_icon}
          alt="Menu"
          className={`w-6 h-6 object-contain transition-transform duration-200 ${mobileOpen ? "rotate-45" : ""}`}
        />
      </div>

      
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/30 z-40 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

     
      <div
        className={`bg-gradient-to-br from-pink-200 to-blue-200 backdrop-blur-3xl border-r border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.35)] flex flex-col h-screen p-3 transition-all duration-300 justify-between
          fixed md:static inset-y-0 left-0 z-40
          ${mobileOpen ? "translate-x-0 w-70" : "-translate-x-full md:translate-x-0"} 
          ${extended ? "md:w-70" : "md:w-20"}`}
      >
        {/* Top Content Wrapper */}
        <div className="w-full flex flex-col gap-5 mt-14 md:mt-0">
          
         
          {!extended ? (
            <div className="hidden md:flex justify-center">
              <div className="relative flex h-10 w-10 items-center justify-center group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
                <img
                  src={assets.gemini_icon}
                  alt="Gemini"
                  className="absolute object-contain transition-all duration-300 group-hover:opacity-0 w-8 h-8"
                />
                <img
                  src={assets.menu_icon}
                  alt="Menu"
                  onClick={() => setExtended(true)}
                  className="absolute w-7 h-7 object-contain opacity-0 group-hover:opacity-100 transition-all duration-200"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between animate-fade-in">
              {/* Gemini Logo */}
              <div className="flex items-center gap-2 select-none">
                <div className="h-10 w-10 transform hover:rotate-12 transition-transform duration-300">
                  <img
                    src={assets.gemini_icon}
                    alt="Gemini"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="text-xl font-bold tracking-wide">Gemini</h1>
              </div>

              {/* Menu Icon */}
              <div className="hidden md:flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/40 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95">
                <img
                  src={assets.menu_icon}
                  alt="Menu"
                  onClick={() => setExtended(false)}
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>
          )}

          {/* Navigation Actions */}
          <div className={`second_div flex flex-col gap-3 transition-all duration-300 ${(extended || mobileOpen) ? "w-full" : "w-full items-center"}`}>
            
            {/* New Chat */}
            <div onClick={() => { newChat(); setMobileOpen(false); }}
              className={`flex flex-row gap-2 h-10 transition-all duration-200 hover:bg-white/40 hover:rounded-2xl cursor-pointer items-center hover:scale-[1.02] active:scale-95 ${
                (extended || mobileOpen) ? "w-full pl-2" : "w-10 justify-center rounded-xl"
              }`}
            >
              <img
                src={assets.plus_icon}
                alt="New Chat"
                className="w-8 h-8 object-contain transition-transform duration-200 group-hover:rotate-90"
              />
              {(extended || mobileOpen) && (
                <div className="flex gap-1 font-medium text-sm text-gray-800">
                  <p>New</p>
                  <p>Chat</p>
                </div>
              )}
            </div>

            {/* Search */}
            <div onClick={() => { searchFunct(); setMobileOpen(false); }}
              className={`flex flex-row gap-2 h-10 transition-all duration-200 hover:bg-white/40 hover:rounded-2xl cursor-pointer items-center hover:scale-[1.02] active:scale-95 ${
                (extended || mobileOpen) ? "w-full pl-2" : "w-10 justify-center rounded-xl"
              }`}
            >
              <img
                src={assets.searchIcon}
                alt="Search"
                className="w-8 h-8 object-contain"
              />
              {(extended || mobileOpen) && (
                <div className="flex gap-1 font-medium text-sm text-gray-800">
                  <p>Search</p>
                  <p>Chats</p>
                </div>
              )}
            </div>

            {/* Images */}
            <div
              className={`flex h-10 flex-row gap-2 transition-all duration-200 hover:bg-white/40 hover:rounded-2xl cursor-pointer items-center hover:scale-[1.02] active:scale-95 ${
                (extended || mobileOpen) ? "w-full pl-2" : "w-10 justify-center rounded-xl"
              }`}
            >
              <img
                src={assets.gallery_icon}
                alt="Images"
                className="ml-1 w-6 h-6 object-contain"
              />
              {(extended || mobileOpen) && <p className="font-medium text-sm text-gray-800">Images</p>}
            </div>

            {/* Library */}
            <div
              className={`flex h-10 flex-row gap-2 transition-all duration-200 hover:bg-white/40 hover:rounded-2xl cursor-pointer items-center hover:scale-[1.02] active:scale-95 ${
                (extended || mobileOpen) ? "w-full pl-2" : "w-10 justify-center rounded-xl"
              }`}
            >
              <img
                src={assets.library}
                alt="Library"
                className="w-8 h-8 object-contain"
              />
              {(extended || mobileOpen) && <p className="font-medium text-sm text-gray-800">Library</p>}
            </div>

          </div>

          {/* Recent Prompts History Session List */}
          {(extended || mobileOpen) && allChats && allChats.length > 0 && (
            <div className="recent flex flex-col gap-2 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
              <p className="font-bold pl-2 text-gray-700 text-sm tracking-wider uppercase">Recent</p>
              <div className="max-h-60 overflow-y-auto flex flex-col gap-1 pr-1 custom-scrollbar">
                {allChats.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleChatClick(item.id)}
                    className="flex items-center gap-2 pl-2 h-10 w-full cursor-pointer rounded-2xl hover:bg-white/40 transition-all duration-200 transform hover:translate-x-1"
                  >
                    <img
                      src={assets.message_icon}
                      alt=""
                      className="w-6 h-6 opacity-80"
                    />
                    <p className="text-sm truncate font-medium text-gray-800">
                      {item.title.length > 18 ? `${item.title.slice(0, 18)}...` : item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Profile / Settings Section */}
        <div className={`bottom flex items-center justify-between pt-4 border-t border-black/10 ${(extended || mobileOpen) ? "flex-row w-full" : "flex-col gap-4 w-full"}`}>
          
          <div className="flex items-center transition-transform duration-200 hover:scale-[1.02]">
            <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer flex-shrink-0 ring-2 ring-white/40 hover:ring-white transition-all">
              <img
                src={assets.user_icon}
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
            {(extended || mobileOpen) && (
              <div className="flex gap-1 ml-3 text-sm font-semibold text-gray-800 animate-fade-in">
                <p>Ayesha</p>
                <p>Khan</p>
              </div>
            )}
          </div>

          {(extended || mobileOpen) && (
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/40 cursor-pointer transition-all duration-200 hover:rotate-45 active:scale-95">
              <img
                src={assets.setting_icon}
                alt="Settings"
                className="w-5 h-5"
              />
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Sidebar;