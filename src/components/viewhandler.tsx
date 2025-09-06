// components/ViewportHandler.tsx
'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const ViewportHandler = () => {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const viewport = searchParams.get('viewport');
    
    if (viewport && typeof window !== 'undefined') {
      const [width, height] = viewport.split('x').map(Number);
      
      if (width && height) {
        // Override window dimensions for responsive design
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        
        Object.defineProperty(window, 'innerHeight', {
          writable: true,
          configurable: true,
          value: height,
        });
        
        // Trigger resize event to update responsive components
        window.dispatchEvent(new Event('resize'));
        
        // Override screen dimensions
        Object.defineProperty(window.screen, 'width', {
          writable: true,
          configurable: true,
          value: width,
        });
        
        Object.defineProperty(window.screen, 'height', {
          writable: true,
          configurable: true,
          value: height,
        });
        
        // Add meta viewport tag for mobile simulation
        let viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
          viewportMeta = document.createElement('meta');
          viewportMeta.setAttribute('name', 'viewport');
          document.head.appendChild(viewportMeta);
        }
        
        if (width <= 768) {
          viewportMeta.setAttribute('content', `width=${width}, initial-scale=1.0, user-scalable=yes`);
        } else {
          viewportMeta.setAttribute('content', `width=${width}, initial-scale=1.0`);
        }
        if (width >= 1920) {
          viewportMeta.setAttribute('content', `width=${width}, initial-scale=0.8, user-scalable=yes`);
        } else {
          viewportMeta.setAttribute('content', `width=${width}, initial-scale=0.8`);
        }
        
        // Add custom CSS for viewport simulation
        const style = document.createElement('style');
        style.textContent = `
          body {
            max-width: ${width}px !important;
            overflow-x: ${width < 768 ? 'hidden' : 'auto'};
          }
          
          /* Force mobile-first responsive behavior */
          @media (min-width: ${width + 1}px) {
            /* These styles won't apply since our simulated width is smaller */
          }
          
          /* Simulate mobile viewport */
          ${width <= 768 ? `
            * {
              box-sizing: border-box;
            }
            
            .container, .max-w-screen-xl, .max-w-7xl {
              max-width: ${width}px !important;
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
          ` : ''}
        `;
        document.head.appendChild(style);
        
        // Override matchMedia for media queries
        const originalMatchMedia = window.matchMedia;
        window.matchMedia = function(query) {
          // Parse common media queries and return appropriate matches
          if (query.includes('max-width')) {
            const match = query.match(/max-width:\s*(\d+)px/);
            if (match) {
              const queryWidth = parseInt(match[1]);
              return {
                matches: width <= queryWidth,
                media: query,
                onchange: null,
                addListener: () => {},
                removeListener: () => {},
                addEventListener: () => {},
                removeEventListener: () => {},
                dispatchEvent: () => true,
              } as MediaQueryList;
            }
          }
          
          if (query.includes('min-width')) {
            const match = query.match(/min-width:\s*(\d+)px/);
            if (match) {
              const queryWidth = parseInt(match[1]);
              return {
                matches: width >= queryWidth,
                media: query,
                onchange: null,
                addListener: () => {},
                removeListener: () => {},
                addEventListener: () => {},
                removeEventListener: () => {},
                dispatchEvent: () => true,
              } as MediaQueryList;
            }
          }
          
          // Fallback to original matchMedia for other queries
          return originalMatchMedia.call(window, query);
        };
        
        console.log(`Viewport simulation active: ${width}x${height}`);
      }
    }
  }, [searchParams]);
  
  return null;
};

export default ViewportHandler;