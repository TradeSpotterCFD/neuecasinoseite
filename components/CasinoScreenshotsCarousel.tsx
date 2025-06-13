
import { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ScreenshotImage {
  src: string;
  alt: string;
}

interface CasinoScreenshotsCarouselProps {
  images: ScreenshotImage[];
  className?: string;
}

export default function CasinoScreenshotsCarousel({ 
  images, 
  className 
}: CasinoScreenshotsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        setApi={setCarouselApi}
        onSelect={() => {
          if (carouselApi) {
            setCurrentIndex(carouselApi.selectedScrollSnap());
          }
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
              <div className="p-1">
                <div className="overflow-hidden rounded-lg border border-border">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-60 w-full object-cover transition-all hover:scale-105 duration-500"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="absolute inset-0 flex items-center justify-between pointer-events-none p-4">
          <CarouselPrevious className="relative left-0 pointer-events-auto" />
          <CarouselNext className="relative right-0 pointer-events-auto" />
        </div>
      </Carousel>
      
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(images.length / 3) }).map((_, groupIndex) => (
          <div
            key={groupIndex}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              Math.floor(currentIndex / 3) === groupIndex ? "bg-primary w-4" : "bg-gray-300"
            )}
            onClick={() => carouselApi?.scrollTo(groupIndex * 3)}
          />
        ))}
      </div>
    </div>
  );
}
