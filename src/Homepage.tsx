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
      <div>
        <div>
          <h3>
            {app.name}
          </h3>
          <span>
            {app.status === 'available' ? 'Available' : 'Coming Soon'}
          </span>
        </div>
        
        <div>
          <span>
            {app.category}
          </span>
        </div>
        
        <p>
          {app.description}
        </p>
        
        {isAvailable && (
          <div>
            Click to open →
          </div>
        )}
      </div>
    );

    return isAvailable ? (
      <Link to={app.route}>
        {cardContent}
      </Link>
    ) : (
      <div>
        {cardContent}
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div>
        <div>
          <div>
            <h1>
              Deadlock Apps | MEMES
            </h1>
            <p>
              A collection of tools and utilities for Deadlock players
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        
        {/* Available Apps Section */}
        {availableApps.length > 0 && (
          <div>
            <h2>
              Available Apps
            </h2>
            <div>
              {availableApps.map((app) => (
                <AppCardComponent key={app.name} app={app} />
              ))}
            </div>
          </div>
        )}

        {/* Coming Soon Section */}
        {comingSoonApps.length > 0 && (
          <div>
            <h2>
              Coming Soon
            </h2>
            <div>
              {comingSoonApps.map((app) => (
                <AppCardComponent key={app.name} app={app} />
              ))}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div>
          <p>
            Built for the Deadlock community. More tools coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;