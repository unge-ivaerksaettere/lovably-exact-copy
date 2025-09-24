import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  fallback,
  priority = false,
  quality = 75,
  className,
  loading = "lazy",
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);

  // Convert image to WebP if supported, otherwise use original
  const getOptimizedSrc = (originalSrc: string) => {
    // Check if browser supports WebP
    const supportsWebP = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    })();

    // For imported assets from src/assets, try to create WebP version
    if (originalSrc.includes('/src/assets/') && supportsWebP) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }

    return originalSrc;
  };

  useEffect(() => {
    if (priority) {
      setCurrentSrc(getOptimizedSrc(src));
    }
  }, [src, priority]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!priority && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentSrc(getOptimizedSrc(src));
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "50px",
        }
      );

      observer.observe(imgRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (fallback) {
      setCurrentSrc(fallback);
      setHasError(false);
    } else if (currentSrc !== src) {
      // Fallback to original if WebP fails
      setCurrentSrc(src);
      setHasError(false);
    }
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={priority ? "eager" : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
      
      {/* Error state */}
      {hasError && !fallback && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
};