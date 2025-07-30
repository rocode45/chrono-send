import { MessageSquare, Clock, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Header = () => {
  return (
    <div 
      className="relative bg-gradient-to-r from-primary to-primary-hover text-primary-foreground py-16 mb-8 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.9)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <MessageSquare className="w-12 h-12" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          WhatsApp Scheduler
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Schedule and automate your WhatsApp messages with ease
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Clock className="w-5 h-5" />
            <span>Smart Scheduling</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Zap className="w-5 h-5" />
            <span>Instant Delivery</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <MessageSquare className="w-5 h-5" />
            <span>Message Tracking</span>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
    </div>
  );
};