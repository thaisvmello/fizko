
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

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou seu assistente fiscal. Como posso ajudá-lo hoje? Você pode me perguntar sobre NCM, CFOP, alíquotas e muito mais!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [freeQueries, setFreeQueries] = useState(3);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check auth state
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
  }, []);

  const searchTaxData = async (query: string, tableType: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-tax-data', {
        body: { query, tableType }
      });

      if (error) throw error;
      return data.results;
    } catch (error: any) {
      if (error.message?.includes('Access denied')) {
        return null; // Access denied
      }
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Check if user has queries left
    if (!user) {
      const loginMessage: Message = {
        id: Date.now(),
        text: "Para usar o assistente fiscal, você precisa fazer login primeiro.",
        isBot: true,
        timestamp: new Date(),
        isUpgrade: true,
      };
      setMessages(prev => [...prev, loginMessage]);
      return;
    }

    if (!isSubscribed && freeQueries <= 0) {
      const upgradeMessage: Message = {
        id: Date.now(),
        text: "Você esgotou suas consultas gratuitas. Faça upgrade para o plano premium para consultas ilimitadas!",
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
      let botResponse = "Entendi sua pergunta. ";
      let foundData = false;
      
      if (currentInput.toLowerCase().includes('ncm')) {
        const results = await searchTaxData(currentInput, 'ncm');
        if (results === null) {
          botResponse = "Para consultas detalhadas de NCM, você precisa comprar acesso às nossas tabelas premium. Com elas você terá acesso a códigos NCM completos, descrições detalhadas e alíquotas atualizadas.";
        } else if (results && results.length > 0) {
          foundData = true;
          botResponse = `Encontrei ${results.length} resultado(s) para NCM:\n\n`;
          results.forEach((item: any, index: number) => {
            botResponse += `${index + 1}. Código: ${item.codigo}\n`;
            botResponse += `   Descrição: ${item.descricao}\n`;
            if (item.aliquota) botResponse += `   Alíquota: ${item.aliquota}\n`;
            botResponse += '\n';
          });
        } else {
          botResponse = "Não encontrei resultados específicos para sua consulta NCM. Tente com termos mais específicos.";
        }
      } else if (currentInput.toLowerCase().includes('cfop')) {
        const results = await searchTaxData(currentInput, 'cfop');
        if (results === null) {
          botResponse = "Para consultas detalhadas de CFOP, você precisa comprar acesso às nossas tabelas premium. Com elas você terá acesso a códigos CFOP completos e orientações de uso.";
        } else if (results && results.length > 0) {
          foundData = true;
          botResponse = `Encontrei ${results.length} resultado(s) para CFOP:\n\n`;
          results.forEach((item: any, index: number) => {
            botResponse += `${index + 1}. Código: ${item.codigo}\n`;
            botResponse += `   Descrição: ${item.descricao}\n`;
            if (item.observacoes) botResponse += `   Observações: ${item.observacoes}\n`;
            botResponse += '\n';
          });
        } else {
          botResponse = "Não encontrei resultados específicos para sua consulta CFOP. Tente com termos mais específicos.";
        }
      } else if (currentInput.toLowerCase().includes('aliquota') || currentInput.toLowerCase().includes('imposto')) {
        botResponse += "As alíquotas variam conforme o produto e estado. Com acesso às nossas tabelas, você terá informações precisas e atualizadas sobre todas as alíquotas.";
      } else {
        botResponse += "Posso ajudá-lo com questões sobre NCM, CFOP, alíquotas e outros temas fiscais. Para informações mais detalhadas, considere nossos planos premium.";
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (!isSubscribed && foundData) {
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

  const handleUpgrade = () => {
    // Scroll to purchase section
    const purchaseSection = document.getElementById('purchase-section');
    if (purchaseSection) {
      purchaseSection.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
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
          {isSubscribed ? "Premium User - Unlimited Queries" : `Consultas gratuitas: ${freeQueries} restantes`}
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
              placeholder="Pergunte sobre NCM, CFOP, impostos..."
              className="flex-1 px-3 py-2 border border-fizko-blue/20 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-fizko-coral"
              disabled={!user || (!isSubscribed && freeQueries <= 0) || isLoading}
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-fizko-coral hover:bg-fizko-coral/90 text-white"
              disabled={!user || (!isSubscribed && freeQueries <= 0) || isLoading}
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
