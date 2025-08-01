import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
// Import your apps as you create them
// import DeadlockItems from './apps/deadlock-items-display';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* Uncomment and fix this once you create the component */}
      {/* <Route path="/deadlock-items" element={<DeadlockItems />} /> */}
      
      {/* Temporary placeholder route */}
      <Route path="/deadlock-items" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Deadlock Items</h1>
            <p className="text-gray-600">This app is coming soon!</p>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;