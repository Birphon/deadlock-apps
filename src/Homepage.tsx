import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Deadlock Development Apps
        </h1>
        
        <p className="text-xl text-gray-600 mb-12">
          A collection of development tools and applications for Deadlock
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            to="/deadlock-items" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Items Display
            </h2>
            <p className="text-gray-600">
              View and manage Deadlock items and equipment
            </p>
          </Link>
          
          {/* Add more app cards here as you create them */}
          <div className="bg-gray-200 p-6 rounded-lg border-2 border-dashed border-gray-300">
            <h2 className="text-xl font-semibold text-gray-500 mb-2">
              Coming Soon
            </h2>
            <p className="text-gray-500">
              More apps will be added here
            </p>
          </div>
          
          <div className="bg-gray-200 p-6 rounded-lg border-2 border-dashed border-gray-300">
            <h2 className="text-xl font-semibold text-gray-500 mb-2">
              Coming Soon
            </h2>
            <p className="text-gray-500">
              More apps will be added here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;