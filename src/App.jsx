import React, { useContext } from "react";
import Sidebar from "./components/sidebar.jsx";
import Main from "./components/Main.jsx";
import { Context } from "./context/context.jsx";
import { assets } from "./assets/assets.js";

const App = () => {
  const {
    showresult,
    chatHistory,
    loading,
    resultdata
  } = useContext(Context);

  return (
    <div className="flex h-screen">

      <Sidebar />

      {showresult ? (
        // Welcome Screen
        <div className="flex items-center justify-center ml-30">
          <Main />
        </div>
      ) : (
        // Chat Screen
        <div className="flex flex-1 flex-col gap-8 ">

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6">

            {/* Entire Conversation */}
            {chatHistory.map((chat, index) => (
              <div key={index} className="mb-8">

                {/* User Prompt */}
                <div className="flex items-center gap-3 mb-4 rounded-full hover:bg-pink-300/60 ">
                  <img
                    src={assets.user_icon}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p>{chat.prompt}</p>
                </div>

                {/* Gemini Response */}
                <div className="flex items-start gap-3">
                  <img
                    src={assets.gemini_icon}
                    alt=""
                    className="w-10 h-10"
                  />
<div
  dangerouslySetInnerHTML={{
    __html:
      index === chatHistory.length - 1
        ? resultdata
        : chat.responseFormatted,
  }}
/>
                  
                </div>

              </div>
            ))}

            {/* Loading Animation */}
            {loading && (
              <div className="flex items-start gap-3">
                <img
                  src={assets.gemini_icon}
                  alt=""
                  className="w-10 h-10"
                />

                <div className="w-full flex flex-col gap-4">
                  <div className="h-4 w-full rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse"></div>

                  <div className="h-4 w-5/6 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse"></div>

                  <div className="h-4 w-3/4 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse"></div>
                </div>
              </div>
            )}

          </div>

          {/* Input Box */}
          <div className="ml-30 mb-4">
            <Main />
          </div>

        </div>
      )}
    </div>
  );
};

export default App;