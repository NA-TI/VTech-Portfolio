import React from 'react';

interface StyledWord {
  word: string;
  style: 'bold' | 'italic' | 'color' | 'bold-color' | 'italic-color';
  color?: string;
}

interface SelectiveTextStylingProps {
  text: string;
  styledWords: StyledWord[];
  className?: string;
}

const SelectiveTextStyling: React.FC<SelectiveTextStylingProps> = ({ 
  text, 
  styledWords, 
  className = "" 
}) => {
  // Create a function to apply styling to words
  const applyStyling = (text: string, styledWords: StyledWord[]) => {
    let result = text;
    
    styledWords.forEach(({ word, style, color }) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      
      const getStyledWord = (matchedWord: string) => {
        let className = '';
        
        switch (style) {
          case 'bold':
            className = 'font-bold';
            break;
          case 'italic':
            className = 'italic';
            break;
          case 'color':
            className = `text-${color || 'blue'}-600 dark:text-${color || 'blue'}-400`;
            break;
          case 'bold-color':
            className = `font-bold text-${color || 'blue'}-600 dark:text-${color || 'blue'}-400`;
            break;
          case 'italic-color':
            className = `italic text-${color || 'blue'}-600 dark:text-${color || 'blue'}-400`;
            break;
          default:
            className = '';
        }
        
        return `<span class="${className}">${matchedWord}</span>`;
      };
      
      result = result.replace(regex, getStyledWord);
    });
    
    return result;
  };

  const styledText = applyStyling(text, styledWords);

  return (
    <p 
      className={`leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: styledText }}
    />
  );
};

export default SelectiveTextStyling; 