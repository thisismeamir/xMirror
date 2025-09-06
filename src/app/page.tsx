'use client';
import ViewFrame from "@/components/view";
import { useState } from "react";




// Device templates
const deviceTemplates = {
  'iPhone 14 Pro': { width: 393, height: 852 },
  'iPhone SE': { width: 375, height: 667 },
  'iPad': { width: 768, height: 1024 },
  'iPad Pro': { width: 1024, height: 1366 },
  'Desktop HD': { width: 1920, height: 1080 },
  'Desktop 4K': { width: 3840, height: 2160 },
  'MacBook Air': { width: 1440, height: 900 },
  'Custom': { width: 0, height: 0 }
};

interface ViewFrameConfig {
  id: string;
  name: string;
  model: string;
  width: number;
  height: number;
  link: string;
}

export default function Home() {
  const [viewFrames, setViewFrames] = useState<ViewFrameConfig[]>([]);
  const [newFrame, setNewFrame] = useState({
    name: '',
    model: 'iPhone 14 Pro',
    customWidth: 1080,
    customHeight: 720,
    link: 'https://nodejs.org'
  });

  const addViewFrame = () => {
    if (!newFrame.name.trim() || !newFrame.link.trim()) {
      alert('Please fill in name and link');
      return;
    }

    const template = deviceTemplates[newFrame.model as keyof typeof deviceTemplates];
    const width = newFrame.model === 'Custom' ? newFrame.customWidth : template.width;
    const height = newFrame.model === 'Custom' ? newFrame.customHeight : template.height;

    const frame: ViewFrameConfig = {
      id: Date.now().toString(),
      name: newFrame.name,
      model: newFrame.model,
      width,
      height,
      link: newFrame.link
    };

    setViewFrames([...viewFrames, frame]);
    
    // Reset form
    setNewFrame({
      name: 'New frame',
      model: 'iPhone 14 Pro',
      customWidth: 1080,
      customHeight: 720,
      link: newFrame.link // Keep the same link for convenience
    });
  };

  const removeViewFrame = (id: string) => {
    setViewFrames(viewFrames.filter(frame => frame.id !== id));
  };

  const clearAllFrames = () => {
    setViewFrames([]);
  };

  return (
    <div className="min-h-screen bg-gray-10 p-6 flex flex-row gap-[16px] ">
      {/* Header */}
      <div className="mb-8 w-[25%]">
        <h1 className="text-[32pt] font-thin text-white">xMirror</h1>
        <p className="text-white">Create responsive viewports to test your website across different devices</p>
        {/* Controls Panel */}
      <div className="w-full rounded-none  p-6 mb-8">
        <h2 className="text-xl font-light mb-4">New frame</h2>
        
        <div className="flex flex-col gap-4 mb-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Frame Name
            </label>
            <input
              type="text"
              value={newFrame.name}
              onChange={(e) => setNewFrame({...newFrame, name: e.target.value})}
              placeholder="e.g., Mobile View"
              className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Template Selector */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Device Template
            </label>
            <select
              value={newFrame.model}
              onChange={(e) => setNewFrame({...newFrame, model: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(deviceTemplates).map(template => (
                <option key={template} value={template}>
                  {template}
                  {template !== 'Custom' && (
                    ` (${deviceTemplates[template as keyof typeof deviceTemplates].width}×${deviceTemplates[template as keyof typeof deviceTemplates].height})`
                  )}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Dimensions (only show if Custom is selected) */}
          {newFrame.model === 'Custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={newFrame.customWidth}
                  onChange={(e) => setNewFrame({...newFrame, customWidth: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={newFrame.customHeight}
                  onChange={(e) => setNewFrame({...newFrame, customHeight: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
        </div>

        {/* URL Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-2">
            Website URL
          </label>
          <input
            type="url"
            value={newFrame.link}
            onChange={(e) => setNewFrame({...newFrame, link: e.target.value})}
            placeholder="http://localhost:3000"
            className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={addViewFrame}
            className="px-6 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add ViewFrame
          </button>
          
          {viewFrames.length > 0 && (
            <button
              onClick={clearAllFrames}
              className="px-6 py-2 bg-red-600 text-white rounded-none hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Clear All ({viewFrames.length})
            </button>
          )}
        </div>
      </div>

      {/* Quick Templates */}
      <div className="   p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Add Common Setups</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              const commonFrames = [
                { name: 'Mobile', model: 'iPhone 14 Pro', link: newFrame.link },
                { name: 'Tablet', model: 'iPad', link: newFrame.link },
                { name: 'Desktop', model: 'Desktop HD', link: newFrame.link }
              ];
              
              const newFrames = commonFrames.map(frame => {
                const template = deviceTemplates[frame.model as keyof typeof deviceTemplates];
                return {
                  id: Date.now().toString() + Math.random(),
                  name: frame.name,
                  model: frame.model,
                  width: template.width,
                  height: template.height,
                  link: frame.link
                };
              });
              
              setViewFrames([...viewFrames, ...newFrames]);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-none hover:bg-green-700 text-sm"
          >
            + Mobile, Tablet, Desktop
          </button>
          
          <button
            onClick={() => {
              const appleFrames = [
                { name: 'iPhone SE', model: 'iPhone SE', link: newFrame.link },
                { name: 'iPhone 14 Pro', model: 'iPhone 14 Pro', link: newFrame.link },
                { name: 'iPad', model: 'iPad', link: newFrame.link },
                { name: 'iPad Pro', model: 'iPad Pro', link: newFrame.link }
              ];
              
              const newFrames = appleFrames.map(frame => {
                const template = deviceTemplates[frame.model as keyof typeof deviceTemplates];
                return {
                  id: Date.now().toString() + Math.random(),
                  name: frame.name,
                  model: frame.model,
                  width: template.width,
                  height: template.height,
                  link: frame.link
                };
              });
              
              setViewFrames([...viewFrames, ...newFrames]);
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-none hover:bg-purple-700 text-sm"
          >
            + Apple Devices
          </button>
        </div>
      </div>
      </div>

      
      {/* ViewFrames Container */}
      {viewFrames.length > 0 ? (
        <div className="flex flex-row items-start justify-start min-h-screen w-screen">
          {viewFrames.map((frame) => (
            <div key={frame.id} className="flex-shrink-0 relative">
              <button
                onClick={() => removeViewFrame(frame.id)}
                className="z-10 w-6 h-6 bg-red-500 text-whitetext-xs hover:bg-red-600 flex items-center justify-center"
              >
                ×
              </button>
              <ViewFrame
                name={frame.name}
                model={frame.model}
                width={frame.width}
                height={frame.height}
                link={frame.link}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-lg font-medium mb-2">No ViewFrames Yet</h3>
          <p>Add your first ViewFrame above to start testing responsive designs</p>
        </div>
      )}

    </div>
  );
}
