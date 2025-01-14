import React from 'react';

export default function Layout({ children, onSignOut, appTheme }) {
  // Dynamically select classes based on theme
  let textClass = 'text-white';
  let bgClass = 'bg-black';
  if (appTheme === 'yellow') {
    textClass = 'text-yellow-500';
    bgClass = 'bg-black';
  } else {
    textClass = 'text-white';
    bgClass = 'bg-black';
  }

  return (
    <div className={`min-h-screen flex flex-col ${bgClass} ${textClass}`}>
      <nav className="bg-gray-800 text-white p-4 flex gap-4 items-center justify-between">
        <div className="flex gap-4">
          <a href="#home" className="cursor-pointer">Home</a>
          <a href="#tools" className="cursor-pointer">Tools</a>
          <a href="#community" className="cursor-pointer">Community</a>
          <a href="#rewards" className="cursor-pointer">Rewards</a>
          <a href="#settings" className="cursor-pointer">Settings</a>
        </div>
        <button
          className="cursor-pointer bg-yellow-500 text-black px-4 py-2 rounded"
          onClick={onSignOut}
        >
          Sign Out
        </button>
      </nav>
      
      <div className="h-full flex-1">
        {children}
      </div>

      <footer className="bg-gray-800 text-white p-2 text-center text-sm">
        <p>
          Made on <a href="https://www.zapt.ai" target="_blank" rel="noreferrer" className="underline">ZAPT</a>
        </p>
      </footer>
    </div>
  );
}