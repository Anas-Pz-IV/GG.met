import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/contexts/TranslationContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Book = () => {
  const { translate, isTranslating, isTranslated } = useTranslation();
  const { toast } = useToast();

  const handleTranslate = async () => {
    try {
      await translate();
      toast({
        title: isTranslated ? "Translation Reset" : "Translation Complete",
        description: isTranslated 
          ? "Page content has been restored to English."
          : "Page content has been translated to Arabic.",
      });
    } catch (error) {
      toast({
        title: "Translation Failed",
        description: "Unable to translate the page. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/819db236-7c8c-4c82-8148-c3d2476ca5e3.png')`
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-hero-overlay" />
      
      {/* Navigation */}
      <Navigation onTranslate={handleTranslate} isTranslating={isTranslating} isTranslated={isTranslated} />
      
      {/* Content */}
      <div className="relative z-20 pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-7xl font-bold text-primary-foreground mb-6">
                THE NOVEL
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Dive into the depths of knowledge and discover the secrets hidden within these pages.
              </p>
            </div>
            
            {/* Book Details */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Book Cover Placeholder */}
              <div className="relative">
                <Card className="bg-glass-bg border-glass-border backdrop-blur-glass p-8 shadow-glass">
                  <div className="aspect-[3/4] bg-gradient-dark rounded-lg flex items-center justify-center">
                    <div className="text-center text-primary-foreground">
                      <div className="w-20 h-20 mx-auto mb-4 opacity-50">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6ZM13 3.5L18.5 9H13V3.5Z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold">THE OTHER SIDE</h3>
                      <p className="text-sm opacity-75"></p>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Book Information */}
              <div className="space-y-8">
                <Card className="bg-glass-bg border-glass-border backdrop-blur-glass p-6 shadow-glass">
                  <h3 className="text-2xl font-bold text-primary-foreground mb-4">About This Novel</h3>
                  <p className="text-primary-foreground/80 leading-relaxed mb-6">
                  The crossing has begun, and the Black Castle looms on the horizon... mysterious as an inescapable fate.
                  </p>
                  <div className="space-y-3 text-primary-foreground/80">
                    <div className="flex justify-between">
                      <span>Pages:</span>
                      <span className="font-semibold">1</span>
                     </div>
                    <div className="flex justify-between">
                      <span>Genre:</span>
                      <span className="font-semibold">Dark Fantasy</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Publication:</span>
                      <span className="font-semibold">2025</span>
                    </div>
                  </div>
                </Card>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" className="flex-1">
                    Read Now
                  </Button>
                  <a
  href="https://drive.google.com/uc?export=download&id=1pS5YG3mtQi5aHwSm3dUVhiodW6czedFH"
  className="flex-1 btn-glass text-white"
  download
  target="_blank"
  rel="noopener noreferrer"
>
  Download
</a>
                </div>
              </div>
            </div>
            
            {/* Chapters Preview */}
            <div className="mt-20">
              <h2 className="text-4xl font-bold text-primary-foreground mb-10 text-center">
                Chapters
              </h2>
              <div className="grid gap-4">
                {[
                  { title: "the crossing", description: "" },
                  { title: "soon", description: "Coming soon..." },
                
                ].map((chapter, index) => (
                  <Link key={index} to={`/chapter/${index + 1}`}>
                    <Card className="bg-glass-bg border-glass-border backdrop-blur-glass p-6 shadow-glass hover:bg-glass-bg/20 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-primary-foreground">
                            Chapter {index + 1}: {chapter.title}
                          </h3>
                          <p className="text-primary-foreground/60 mt-1">
                            {chapter.description}
                          </p>
                        </div>
                        <div className="text-primary-foreground/40">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;