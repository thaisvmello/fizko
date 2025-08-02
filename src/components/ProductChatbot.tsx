import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isUpgrade?: boolean;
}

interface ProductChatbotProps {
  productId: string;
  maxFreeQueries?: number;
}

const ProductChatbot = ({ productId = "prod_SmClL8v57p0wX7", maxFreeQueries = 10 }: ProductChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou seu assistente especializado. Como posso ajudá-lo hoje?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [freeQueries, setFreeQueries] = useState(maxFreeQueries);
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check auth state
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkProductAccess();
      }
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkProductAccess();
      }
    });
  }, []);

  const checkProductAccess = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      
      // Check if user has access to the specific product
      const hasProductAccess = data.purchases?.some((purchase: any) => 
        purchase.stripe_product_id === productId
      ) || data.subscribed;
      
      setHasAccess(hasProductAccess);
    } catch (error) {
      console.error('Error checking product access:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Check if user has queries left
    if (!user) {
      const loginMessage: Message = {
        id: Date.now(),
        text: "Para usar este assistente, você precisa fazer login primeiro.",
        isBot: true,
        timestamp: new Date(),
        isUpgrade: true,
      };
      setMessages(prev => [...prev, loginMessage]);
      return;
    }

    if (!hasAccess && freeQueries <= 0) {
      const upgradeMessage: Message = {
        id: Date.now(),
        text: "Você esgotou suas consultas gratuitas. Adquira acesso completo para consultas ilimitadas!",
        isBot: true,
        timestamp: new Date(),
        isUpgrade: true,
      };
      setMessages(prev => [...prev, upgradeMessage]);
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('botpress-chat', {
        body: { 
          message: currentInput, 
          conversationId,
          userId: user?.id 
        }
      });

      if (error) throw error;

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }
      
      if (!hasAccess) {
        setFreeQueries(prev => prev - 1);
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao processar sua consulta. Tente novamente.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Desculpe, ocorreu um erro ao processar sua consulta. Tente novamente.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          productType: 'chatbot_premium',
          productName: 'Chatbot Premium Access',
          priceAmount: 2999 // R$ 29,99
        }
      });

      if (error) throw error;
      
      if (data.url) {
        window.open(data.url, '_blank');
        setIsOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao processar pagamento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-16 h-16 rounded-full shadow-lg animate-float"
        style={{ backgroundColor: '#c0b9b4' }}
        size="icon"
      >
        <img 
          src="/lovable-uploads/1ed3cdfd-25d5-43eb-8b77-702d7be73be2.png" 
          alt="Fizk.o Icon" 
          className="w-6 h-6 filter brightness-0"
        />
      </Button>
    );
  }

  return (
    <Card className="w-96 h-96 shadow-xl border-fizko-blue/20">
      <CardHeader className="text-white rounded-t-lg p-4" style={{ backgroundColor: '#c0b9b4' }}>
        <div className="flex items-center justify-between">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <img 
              src="/lovable-uploads/1ed3cdfd-25d5-43eb-8b77-702d7be73be2.png" 
              alt="Fizk.o Icon" 
              className="w-5 h-5 filter brightness-0"
            />
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
          {hasAccess ? "Acesso Premium - Consultas Ilimitadas" : `Consultas gratuitas: ${freeQueries} restantes`}
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
                  : 'text-white'
              }`} style={!message.isBot ? { backgroundColor: '#c0b9b4' } : {}}>
                {message.text}
                {message.isUpgrade && (
                  <Button
                    onClick={handleUpgrade}
                    className="w-full mt-2 bg-fizko-blue hover:bg-fizko-blue/90 text-white text-xs"
                    size="sm"
                  >
                    Adquirir Acesso Premium
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
              placeholder="Faça sua pergunta..."
              className="flex-1 px-3 py-2 border border-fizko-blue/20 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-fizko-coral"
              disabled={!user || (!hasAccess && freeQueries <= 0) || isLoading}
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="text-white"
              style={{ backgroundColor: '#c0b9b4' }}
              disabled={!user || (!hasAccess && freeQueries <= 0) || isLoading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductChatbot;