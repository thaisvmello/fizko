import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    botpress: any;
  }
}

interface BotpressChatbotProps {
  isFloating?: boolean;
  onOpen?: () => void;
}

const BotpressChatbot = ({ isFloating = false, onOpen }: BotpressChatbotProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Botpress scripts
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js';
    injectScript.defer = true;
    document.head.appendChild(injectScript);

    const configScript = document.createElement('script');
    configScript.src = 'https://files.bpcontent.cloud/2025/07/30/16/20250730160400-PRY7PKF0.js';
    configScript.defer = true;
    document.head.appendChild(configScript);

    // Wait for scripts to load
    const checkBotpress = setInterval(() => {
      if (window.botpress) {
        setIsLoaded(true);
        clearInterval(checkBotpress);
        
        // Configure Botpress
        window.botpress.init({
          clientId: '9aa47972-5223-41b9-bb57-d22005b8ba22',
          botId: '9aa47972-5223-41b9-bb57-d22005b8ba22',
          hideWidget: isFloating, // Hide default widget if we're using custom floating button
        });
      }
    }, 100);

    return () => {
      clearInterval(checkBotpress);
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll('script[src*="botpress"]');
      scripts.forEach(script => script.remove());
    };
  }, [isFloating]);

  const openChatbot = () => {
    if (window.botpress) {
      window.botpress.open();
      onOpen?.();
    } else {
      // Open Botpress in new tab for button clicks
      window.open('https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/07/30/16/20250730160400-G8B5OPNZ.json', '_blank');
      onOpen?.();
    }
  };

  if (isFloating) {
    return (
      <Button
        onClick={openChatbot}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg animate-float z-50"
        style={{ backgroundColor: '#c0b9b4' }}
        size="icon"
        disabled={!isLoaded}
      >
        <img 
          src="/lovable-uploads/050301e4-b562-4b42-aded-519ca1a67848.png" 
          alt="Fizko Chatbot" 
          className="w-8 h-8"
        />
      </Button>
    );
  }

  return (
    <Button
      onClick={openChatbot}
      className="w-full bg-fizko-coral hover:bg-fizko-coral/90 text-white"
    >
      Abrir Chatbot
    </Button>
  );
};

export default BotpressChatbot;