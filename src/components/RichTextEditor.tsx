import React, { useState, useRef, useEffect } from 'react';

interface StyledWord {
  word: string;
  style: 'bold' | 'italic' | 'color' | 'bold-color' | 'italic-color';
  color?: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string, styledWords: StyledWord[]) => void;
  placeholder?: string;
  className?: string;
  initialStyledWords?: StyledWord[];
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start typing...",
  className = "",
  initialStyledWords = []
}) => {
  const [styledWords, setStyledWords] = useState<StyledWord[]>(initialStyledWords);
  const [selectedText, setSelectedText] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLDivElement>(null);

  const colorOptions = [
    { name: 'blue', class: 'text-blue-600 dark:text-blue-400' },
    { name: 'purple', class: 'text-purple-600 dark:text-purple-400' },
    { name: 'green', class: 'text-green-600 dark:text-green-400' },
    { name: 'red', class: 'text-red-600 dark:text-red-400' },
    { name: 'orange', class: 'text-orange-600 dark:text-orange-400' },
    { name: 'pink', class: 'text-pink-600 dark:text-pink-400' },
  ];

  // Initialize styledWords when initialStyledWords changes (for editing existing content)
  useEffect(() => {
    console.log('🔍 RichTextEditor: Initializing with styledWords:', initialStyledWords);
    setStyledWords(initialStyledWords);
  }, [initialStyledWords]);

  // Update parent component when styledWords change (but not when value changes to avoid loops)
  useEffect(() => {
    console.log('🔍 RichTextEditor: styledWords changed:', styledWords);
    onChange(value, styledWords);
  }, [styledWords]);

  const handleTextChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.textContent || '';
    console.log('🔍 RichTextEditor: Text changed to:', newValue);
    onChange(newValue, styledWords);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setShowToolbar(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();

    if (selectedText) {
      setSelectedText(selectedText);
      
      // Calculate toolbar position relative to the contenteditable div
      const textareaRect = textareaRef.current?.getBoundingClientRect();
      if (!textareaRect) return;
      
      const rangeRect = range.getBoundingClientRect();
      
      const x = Math.min(rangeRect.left, textareaRect.right - 200);
      const y = rangeRect.top - 60;

      setToolbarPosition({ x, y });
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  };

  const applyStyle = (style: 'bold' | 'italic' | 'color' | 'bold-color' | 'italic-color', color?: string) => {
    if (!selectedText.trim()) return;

    const newStyledWord: StyledWord = {
      word: selectedText,
      style,
      color
    };

    // Check if word already exists and update it, otherwise add new
    const existingIndex = styledWords.findIndex(sw => sw.word.toLowerCase() === selectedText.toLowerCase());
    
    if (existingIndex >= 0) {
      const updatedStyledWords = [...styledWords];
      updatedStyledWords[existingIndex] = newStyledWord;
      setStyledWords(updatedStyledWords);
    } else {
      setStyledWords([...styledWords, newStyledWord]);
    }

    setShowToolbar(false);
    setSelectedText('');
    
    // Clear the selection
    window.getSelection()?.removeAllRanges();
    
    // Refocus the contenteditable div
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const removeStyle = (word: string) => {
    setStyledWords(styledWords.filter(sw => sw.word.toLowerCase() !== word.toLowerCase()));
  };

  const getStyleDisplay = (style: string, color?: string) => {
    switch (style) {
      case 'bold':
        return <span className="font-bold">B</span>;
      case 'italic':
        return <span className="italic">I</span>;
      case 'color':
        return <span className={`font-bold ${colorOptions.find(c => c.name === color)?.class || 'text-blue-600'}`}>A</span>;
      case 'bold-color':
        return <span className={`font-bold ${colorOptions.find(c => c.name === color)?.class || 'text-blue-600'}`}>B</span>;
      case 'italic-color':
        return <span className={`italic ${colorOptions.find(c => c.name === color)?.class || 'text-blue-600'}`}>I</span>;
      default:
        return <span>?</span>;
    }
  };

  return (
    <div className={`relative ${className}`}>
              {/* Text Editor */}
        <div className="relative">
          <div
            ref={textareaRef as any}
            contentEditable
            onInput={handleTextChange}
            onSelect={handleTextSelection}
            onBlur={() => setTimeout(() => setShowToolbar(false), 200)}
            onFocus={() => {
              // Keep toolbar visible if there's selected text
              if (selectedText.trim()) {
                handleTextSelection();
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white min-h-[120px] resize-y outline-none [&:empty:before]:content-[attr(data-placeholder)] [&:empty:before]:text-gray-400 [&:empty:before]:pointer-events-none"
            style={{ 
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
            dangerouslySetInnerHTML={{
              __html: value ? (styledWords.length > 0 ? 
                styledWords.reduce((text, styledWord) => {
                  const regex = new RegExp(`\\b${styledWord.word}\\b`, 'gi');
                  const className = styledWord.style === 'bold' ? 'font-bold' :
                                 styledWord.style === 'italic' ? 'italic' :
                                 styledWord.style === 'color' ? `text-${styledWord.color || 'blue'}-600 dark:text-${styledWord.color || 'blue'}-400` :
                                 styledWord.style === 'bold-color' ? `font-bold text-${styledWord.color || 'blue'}-600 dark:text-${styledWord.color || 'blue'}-400` :
                                 styledWord.style === 'italic-color' ? `italic text-${styledWord.color || 'blue'}-600 dark:text-${styledWord.color || 'blue'}-400` : '';
                  return text.replace(regex, `<span class="${className}">${styledWord.word}</span>`);
                }, value) : value) : ''
            }}
            data-placeholder={placeholder}
          />
        
        {/* Preview removed - styling is now visible in the editing area */}
      </div>

      {/* Floating Toolbar */}
      {showToolbar && (
        <div
          className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 p-2"
          style={{
            left: toolbarPosition.x,
            top: toolbarPosition.y,
          }}
        >
          <div className="flex items-center space-x-1">
            <button
              onClick={() => applyStyle('bold')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm font-bold"
              title="Bold"
            >
              B
            </button>
            <button
              onClick={() => applyStyle('italic')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm italic"
              title="Italic"
            >
              I
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => applyStyle('bold-color', color.name)}
                className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm font-bold ${color.class}`}
                title={`Bold ${color.name}`}
              >
                B
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Styled Words List */}
      {styledWords.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Styled Words:</h4>
          <div className="flex flex-wrap gap-2">
            {styledWords.map((styledWord, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600"
              >
                <span className="text-xs">
                  {getStyleDisplay(styledWord.style, styledWord.color)}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  "{styledWord.word}"
                </span>
                <button
                  onClick={() => removeStyle(styledWord.word)}
                  className="text-red-500 hover:text-red-700 text-xs"
                  title="Remove style"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>💡 <strong>How to use:</strong></p>
        <ul className="mt-1 space-y-1">
          <li>• Select any word or phrase in the text</li>
          <li>• Use the toolbar that appears to apply styling</li>
          <li>• Choose from bold, italic, or colored text</li>
          <li>• Remove styles using the × button in the styled words list</li>
        </ul>
      </div>
    </div>
  );
};

export default RichTextEditor; 