
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isUpgrade?: boolean;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your FIZK.O assistant. I can help you with NCM codes, tax information, and fiscal questions. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [queryCount] = useState(2); // Simulating user has used 2 free queries
  const [isSubscribed] = useState(false); // Simulating non-subscribed user

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Check if user has remaining free queries
    if (!isSubscribed && queryCount >= 3) {
      const upgradeMessage = {
        id: messages.length + 1,
        text: "You've reached your free query limit (3/3). Subscribe to Premium for unlimited access to our AI assistant!",
        isBot: true,
        timestamp: new Date(),
        isUpgrade: true
      };
      setMessages([...messages, upgradeMessage]);
      return;
    }

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    // Simulate bot response based on keywords
    let botResponse = "I'm here to help with fiscal questions. Could you be more specific about what you need?";
    
    const lowerInput = inputMessage.toLowerCase();
    if (lowerInput.includes('ncm')) {
      botResponse = "NCM (Nomenclatura Comum do Mercosul) codes classify products for tax purposes. For example: 3004.90.19 for medications, 1905.90.90 for bakery products. What specific product do you need help with?";
    } else if (lowerInput.includes('cfop')) {
      botResponse = "CFOP codes identify the nature of operations. Common ones include: 5102 (sales within state), 6102 (sales to other states), 1102 (purchases within state). What type of operation are you dealing with?";
    } else if (lowerInput.includes('tax') || lowerInput.includes('imposto')) {
      botResponse = "I can help with tax calculations! Brazil has various taxes like ICMS, IPI, PIS/COFINS. Each has different rates depending on the product and state. What specific tax information do you need?";
    }

    const botMessage = {
      id: messages.length + 2,
      text: botResponse,
      isBot: true,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputMessage("");
  };

  const handleUpgrade = () => {
    alert("Redirecting to Premium subscription...");
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-fizko-coral hover:bg-fizko-coral/90 text-white shadow-lg animate-float z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-96 shadow-xl z-50 border-fizko-blue/20">
      <CardHeader className="bg-fizko-coral text-white rounded-t-lg p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            FIZK.O Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs opacity-90 font-montserrat">
          {isSubscribed ? "Premium User - Unlimited Queries" : `Free Trial: ${queryCount}/3 queries used`}
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-80">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-xs p-3 rounded-lg text-sm font-montserrat ${
                message.isBot 
                  ? 'bg-fizko-beige text-foreground' 
                  : 'bg-fizko-coral text-white'
              }`}>
                {message.text}
                {message.isUpgrade && (
                  <Button
                    onClick={handleUpgrade}
                    className="w-full mt-2 bg-fizko-blue hover:bg-fizko-blue/90 text-white text-xs"
                    size="sm"
                  >
                    Upgrade to Premium
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-fizko-blue/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about NCM, CFOP, taxes..."
              className="flex-1 px-3 py-2 border border-fizko-blue/20 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-fizko-coral"
              disabled={!isSubscribed && queryCount >= 3}
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-fizko-coral hover:bg-fizko-coral/90 text-white"
              disabled={!isSubscribed && queryCount >= 3}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotWidget;
