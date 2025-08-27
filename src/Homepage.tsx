// src/Homepage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface AppCard {
  name: string;
  description: string;
  route: string;
  status: 'available' | 'coming-soon';
  category: string;
}

const Homepage: React.FC = () => {
  const apps: AppCard[] = [
    {
      name: 'StatLock',
      description: 'Deadlock Stats Manager - Save and organize character stats, abilities, and game data',
      route: '/statlock',
      status: 'available',
      category: 'Data Management'
    },
    {
      name: 'ItemLock',
      description: 'Deadlock Item Parser - Parse and analyze item builds and configurations',
      route: '/itemlock',
      status: 'coming-soon',
      category: 'Build Tools'
    }
  ];

  const availableApps = apps.filter(app => app.status === 'available');
  const comingSoonApps = apps.filter(app => app.status === 'coming-soon');

  const AppCardComponent: React.FC<{ app: AppCard }> = ({ app }) => {
    const isAvailable = app.status === 'available';
    
    const cardContent = (
      <div className={`
        bg-white rounded-lg shadow-md p-6 transition-all duration-200 border-2 
        ${isAvailable 
          ? 'hover:shadow-lg hover:border-blue-300 cursor-pointer' 
          : 'opacity-60 cursor-not-allowed border-gray-200'
        }
      `}>
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-semibold ${isAvailable ? 'text-gray-800' : 'text-gray-500'}`}>
            {app.name}
          </h3>
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${app.status === 'available' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
            }
          `}>
            {app.status === 'available' ? 'Available' : 'Coming Soon'}
          </span>
        </div>
        
        <div className="mb-4">
          <span className={`
            text-xs font-medium px-2 py-1 rounded
            ${isAvailable ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}
          `}>
            {app.category}
          </span>
        </div>
        
        <p className={`text-sm leading-relaxed ${isAvailable ? 'text-gray-600' : 'text-gray-400'}`}>
          {app.description}
        </p>
        
        {isAvailable && (
          <div className="mt-4 text-blue-600 font-medium text-sm">
            Click to open →
          </div>
        )}
      </div>
    );

    return isAvailable ? (
      <Link to={app.route} className="block">
        {cardContent}
      </Link>
    ) : (
      <div>
        {cardContent}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Deadlock Apps | MEMES
            </h1>
            <p className="text-lg text-gray-600">
              A collection of tools and utilities for Deadlock players
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Available Apps Section */}
        {availableApps.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Available Apps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableApps.map((app) => (
                <AppCardComponent key={app.name} app={app} />
              ))}
            </div>
          </div>
        )}

        {/* Coming Soon Section */}
        {comingSoonApps.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Coming Soon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonApps.map((app) => (
                <AppCardComponent key={app.name} app={app} />
              ))}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built for the Deadlock community. More tools coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;