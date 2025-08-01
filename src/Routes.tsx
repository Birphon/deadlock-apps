import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
// import deadlockItems from './apps/deadlock-items-display';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/deadlock-Items" element={<deadlockItems />} />
    </Routes>
  );
};

export default AppRoutes;