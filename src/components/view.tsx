'use client'
// view.tsx
import React, { useEffect, useRef, useState } from 'react';

interface View {
    name: string;
    model: string;
    link: string;
    width: number;
    height: number;
}

const ViewFrame: React.FC<View> = ({ name, model, link, width, height }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Calculate scale to fit the frame within its container
    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current.parentElement;
            if (container) {
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                
                const scaleX = containerWidth / width;
                const scaleY = containerHeight / height;
                const finalScale = Math.min(scaleX, scaleY); // Don't scale up
                
                setScale(finalScale);
            }
        }
    }, [width, height]);

    // Method 1: Using iframe with scaling (for same-origin content)
    const renderScaledIframe = () => (
        <div 
            ref={containerRef}
            className="relative overflow-hidden border"
            style={{
                width: width * scale,
                height: height * scale,
            }}
        >
            <iframe
                src={`${link}?viewport=${width}x${height}`} // Pass viewport as query param
                className="absolute top-0 left-0 border-0"
                style={{
                    width: width,
                    height: height,
                    transform: `scale(${scale}})`,
                    transformOrigin: '0 0',
                }}
                onLoad={() => setIsLoading(false)}
                sandbox="allow-same-origin allow-scripts allow-forms"
            />
            {isLoading && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-500">Loading {name}...</div>
                </div>
            )}
        </div>
    );

    // Method 2: Using object tag (alternative approach)
    const renderObjectEmbed = () => (
        <div 
            className="relative overflow-hidden border "
            style={{
                width: width * scale,
                height: height * scale,
            }}
        >
            <object
                data={link}
                type="text/html"
                className="absolute top-0 left-0"
                style={{
                    width: width,
                    height: height,
                    transform: `scale(${scale})`,
                    transformOrigin: '0 0',
                }}
            />
        </div>
    );

    return (
        <div className="viewFrame p-4 ">
            <div className="viewFrameHeader p-3 bg-black  border">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-semibold">{name}</span> 
                        {model !== "no-model" && <span className="text-gray-600"> - {model}</span>}
                    </div>
                    <div className="text-sm text-gray-500">
                        {width} × {height} (scale: {(scale * 100).toFixed(1)}%)
                    </div>
                </div>
            </div>
            
            <div className="viewFrameContent flex justify-center">
                {renderScaledIframe()}
            </div>
            
            {/* Viewport info */}
            <div className="mt-2 text-xs  text-center">
                Simulated viewport: {width}×{height}px
            </div>
        </div>
    );
};

export default ViewFrame;
