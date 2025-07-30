import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Clock, 
  Phone, 
  Send, 
  CheckCircle, 
  XCircle,
  RefreshCw
} from "lucide-react";

interface ScheduledMessage {
  id: string;
  phone: string;
  message: string;
  scheduleTime: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

// Mock data for demonstration
const mockMessages: ScheduledMessage[] = [
  {
    id: "1",
    phone: "+1234567890",
    message: "Hello! This is a scheduled message from WhatsApp Scheduler.",
    scheduleTime: "2024-07-31T10:00:00",
    status: "pending",
    createdAt: "2024-07-30T09:00:00"
  },
  {
    id: "2",
    phone: "+0987654321",
    message: "Reminder: Your appointment is tomorrow at 3 PM.",
    scheduleTime: "2024-07-30T15:00:00",
    status: "sent",
    createdAt: "2024-07-29T14:30:00"
  },
  {
    id: "3",
    phone: "+1122334455",
    message: "Happy birthday! Hope you have a wonderful day!",
    scheduleTime: "2024-07-29T08:00:00",
    status: "failed",
    createdAt: "2024-07-28T20:00:00"
  }
];

export const MessagesList = () => {
  const [messages, setMessages] = useState<ScheduledMessage[]>(mockMessages);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'sent':
        return 'default' as const;
      case 'failed':
        return 'destructive' as const;
      default:
        return 'secondary' as const;
    }
  };

  const handleSendNow = async (messageId: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      );
      
      toast({
        title: "Message Sent!",
        description: "The message has been sent successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to refresh messages
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Refreshed",
        description: "Message list has been updated.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            Scheduled Messages
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No messages scheduled yet</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className="border rounded-lg p-4 space-y-3 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{message.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(message.status)}
                    <Badge variant={getStatusVariant(message.status)}>
                      {message.status}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {message.message}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Scheduled: {new Date(message.scheduleTime).toLocaleString()}
                  </span>
                  <span>
                    Created: {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                {message.status === 'pending' && (
                  <Button
                    size="sm"
                    onClick={() => handleSendNow(message.id)}
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary-hover transition-all duration-200"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};