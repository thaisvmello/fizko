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
          src="/lovable-uploads/1ae2d948-e4c2-42fe-957f-0574f1110e2d.png" 
          alt="Chatbot Icon" 
          className="w-8 h-8"
        />
      </Button>
    );
  }

  return (
    <Button
      onClick={openChatbot}
      className="w-full bg-fizko-coral hover:bg-fizko-coral/90 text-white"
      disabled={!isLoaded}
    >
      {isLoaded ? 'Abrir Chatbot' : 'Carregando...'}
    </Button>
  );
};

export default BotpressChatbot;