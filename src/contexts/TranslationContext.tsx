import { createContext, useContext, useState, ReactNode } from "react";
import { translateText, reverseTranslateText } from "@/utils/translations";

interface TranslationContextType {
  isTranslated: boolean;
  isTranslating: boolean;
  translate: () => Promise<void>;
  resetTranslation: () => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [isTranslated, setIsTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [originalTexts, setOriginalTexts] = useState<Map<string, string>>(new Map());

  const translateElementsRecursively = async (element: Element, isReverse = false) => {
    // Skip script, style, and other non-text elements
    if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE' || element.tagName === 'NOSCRIPT') {
      return;
    }

    // Process text nodes
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes[i];

      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const currentText = node.textContent.trim();

        // Skip if text is too short or contains only symbols/numbers
        if (currentText.length < 1 || /^[^\w\s\u0600-\u06FF]*$/.test(currentText)) {
          continue;
        }

        try {
          const translatedText = isReverse
            ? reverseTranslateText(currentText)
            : translateText(currentText);

          // Only update if translation is different
          if (translatedText !== currentText) {
            // Store original text for restoration
            const nodeId = `text-${Date.now()}-${Math.random()}`;
            if (!isReverse) {
              setOriginalTexts(prev => new Map(prev.set(nodeId, currentText)));
            }

            // Preserve surrounding whitespace
            const leadingSpace = node.textContent.match(/^\s*/)?.[0] || '';
            const trailingSpace = node.textContent.match(/\s*$/)?.[0] || '';
            node.textContent = leadingSpace + translatedText + trailingSpace;
          }
        } catch (error) {
          console.error('Failed to translate text:', currentText, error);
        }
      }
    }

    // Process child elements
    for (let i = 0; i < element.children.length; i++) {
      await translateElementsRecursively(element.children[i], isReverse);
    }
  };

  const translate = async () => {
    if (isTranslating) return;

    setIsTranslating(true);

    try {
      // Get all text elements on the page
      const mainContent = document.querySelector('main') || document.body;
      const htmlElement = document.documentElement;

      if (isTranslated) {
        // Reset to English
        await translateElementsRecursively(mainContent, true);
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', 'en');
        setIsTranslated(false);
        setOriginalTexts(new Map());
      } else {
        // Translate to Arabic
        await translateElementsRecursively(mainContent, false);
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', 'ar');
        setIsTranslated(true);
      }
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const resetTranslation = () => {
    if (!isTranslated) return;
    translate(); // This will now toggle back to English
  };

  return (
    <TranslationContext.Provider value={{
      isTranslated,
      isTranslating,
      translate,
      resetTranslation,
    }}>
      {children}
    </TranslationContext.Provider>
  );
};