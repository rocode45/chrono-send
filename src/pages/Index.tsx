import { Header } from "@/components/Header";
import { MessageScheduler } from "@/components/MessageScheduler";
import { MessagesList } from "@/components/MessagesList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-8">
            <MessageScheduler />
          </div>
          
          <div className="space-y-8">
            <MessagesList />
          </div>
        </div>
        
        <div className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">
            ⚠️ This is the frontend interface. For full functionality, connect to a backend API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
