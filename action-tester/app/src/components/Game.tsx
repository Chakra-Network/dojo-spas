"use client";

import { useEffect, useState, useRef } from "react";
import type { GameState } from "./types";
import { useDojoState } from "@chakra-dev/dojo-hooks";

const defaultState: GameState = {
  hasClicked: false,
  hasDoubleClicked: false,
  hasDragged: false,
  hasHotkeyed: false,
  hasMiddleClicked: false,
  hasRightClicked: false,
  hasScrolled: false,
  hasTyped: false,
};

const ActionCard = ({
  title,
  description,
  isCompleted,
  children,
}: {
  title: string;
  description: string;
  isCompleted: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={`
    p-4 sm:p-6 border-2 rounded-lg transition-all duration-300 min-h-[180px] sm:min-h-[200px] flex flex-col justify-between
    ${
      isCompleted
        ? "bg-green-100 border-green-400 shadow-lg"
        : "bg-white border-gray-300 hover:border-gray-400"
    }
  `}
  >
    <div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
        {description}
      </p>
    </div>
    <div className="flex-1 flex items-center justify-center">{children}</div>
    {isCompleted && (
      <div className="text-green-600 font-medium text-center">✓ Completed!</div>
    )}
  </div>
);

export default function Game() {
  const [gameState, setGameState] = useDojoState<GameState>(defaultState);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const dragRef = useRef<HTMLDivElement>(null);
  const typeInputRef = useRef<HTMLInputElement>(null);

  // Handle click
  const handleClick = () => {
    setGameState({ ...gameState, hasClicked: true });
  };

  // Handle double click
  const handleDoubleClick = () => {
    setGameState({ ...gameState, hasDoubleClicked: true });
  };

  // Handle middle click
  const handleMiddleClick = (e: React.MouseEvent) => {
    if (e.button === 1) {
      e.preventDefault();
      setGameState({ ...gameState, hasMiddleClicked: true });
    }
  };

  // Handle right click
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setGameState({ ...gameState, hasRightClicked: true });
  };

  // Handle drag
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;

    if (
      Math.abs(newX - dragPosition.x) > 10 ||
      Math.abs(newY - dragPosition.y) > 10
    ) {
      setGameState({ ...gameState, hasDragged: true });
      setDragPosition({ x: newX, y: newY });
    }
  };

  // Handle typing
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 5 && !gameState.hasTyped) {
      setGameState({ ...gameState, hasTyped: true });
    }
  };

  // Handle hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        setGameState({ ...gameState, hasHotkeyed: true });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, setGameState]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      if (currentScrollY > 100) {
        setGameState({ ...gameState, hasScrolled: true });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [gameState, setGameState]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Click */}
        <ActionCard
          title="Click"
          description="Click the button below"
          isCompleted={gameState.hasClicked}
        >
          <button
            onClick={handleClick}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Click Me!
          </button>
        </ActionCard>

        {/* Double Click */}
        <ActionCard
          title="Double Click"
          description="Double-click the button below"
          isCompleted={gameState.hasDoubleClicked}
        >
          <button
            onDoubleClick={handleDoubleClick}
            className="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Double Click Me!
          </button>
        </ActionCard>

        {/* Right Click */}
        <ActionCard
          title="Right Click"
          description="Right-click the area below"
          isCompleted={gameState.hasRightClicked}
        >
          <div
            onContextMenu={handleRightClick}
            className="w-32 h-20 bg-orange-500 rounded flex items-center justify-center text-white cursor-pointer hover:bg-orange-600 transition-colors"
          >
            Right Click Here
          </div>
        </ActionCard>

        {/* Middle Click */}
        <ActionCard
          title="Middle Click"
          description="Middle-click (scroll wheel) the area below"
          isCompleted={gameState.hasMiddleClicked}
        >
          <div
            onMouseDown={handleMiddleClick}
            className="w-32 h-20 bg-teal-500 rounded flex items-center justify-center text-white cursor-pointer hover:bg-teal-600 transition-colors"
          >
            Middle Click Here
          </div>
        </ActionCard>

        {/* Drag */}
        <ActionCard
          title="Drag"
          description="Drag the box below to a new position"
          isCompleted={gameState.hasDragged}
        >
          <div
            ref={dragRef}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="w-24 h-24 bg-red-500 rounded cursor-move flex items-center justify-center text-white hover:bg-red-600 transition-colors"
            style={{
              transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
            }}
          >
            Drag Me
          </div>
        </ActionCard>

        {/* Type */}
        <ActionCard
          title="Type"
          description="Type at least 5 characters in the input below"
          isCompleted={gameState.hasTyped}
        >
          <input
            ref={typeInputRef}
            type="text"
            placeholder="Type here..."
            onChange={handleTyping}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full"
          />
        </ActionCard>

        {/* Hotkey */}
        <ActionCard
          title="Hotkey"
          description="Press Ctrl+S (or Cmd+S on Mac)"
          isCompleted={gameState.hasHotkeyed}
        >
          <div className="text-center">
            <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">
              Ctrl
            </kbd>
            <span className="mx-2">+</span>
            <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">
              S
            </kbd>
            <div className="mt-2 text-sm text-gray-600">
              Press this key combination
            </div>
          </div>
        </ActionCard>

        {/* Scroll */}
        <ActionCard
          title="Scroll"
          description="Scroll down on this page (100px or more)"
          isCompleted={gameState.hasScrolled}
        >
          <div className="text-center">
            <div className="text-4xl">↓</div>
            <div className="text-sm text-gray-600 mt-2">
              Scroll: {Math.round(scrollY)}px
            </div>
          </div>
        </ActionCard>
      </div>

      {/* Progress Summary */}
      <div className="text-center bg-gray-50 p-4 sm:p-6 rounded-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Progress
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
          {Object.entries(gameState).map(([key, completed]) => (
            <div
              key={key}
              className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                completed
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {key
                .replace("has", "")
                .replace(/([A-Z])/g, " $1")
                .trim()}
              {completed ? " ✓" : ""}
            </div>
          ))}
        </div>
        <div className="mt-3 sm:mt-4">
          <div className="text-base sm:text-lg">
            {Object.values(gameState).filter(Boolean).length} /{" "}
            {Object.keys(gameState).length} actions completed
          </div>
          {Object.values(gameState).every(Boolean) && (
            <div className="text-green-600 font-bold text-lg sm:text-xl mt-2">
              🎉 All actions completed!
            </div>
          )}
        </div>
      </div>

      {/* Add some height for scrolling test */}
      <div className="h-64 sm:h-96 mt-6 sm:mt-8 bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-600">
          <div className="text-base sm:text-lg font-medium">
            Scroll Test Area
          </div>
          <div className="text-xs sm:text-sm mt-2">
            Scroll down to test the scroll action
          </div>
        </div>
      </div>
    </div>
  );
}
