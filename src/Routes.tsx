import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import DeadlockItemParser from './apps/deadlock-item-parser';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/deadlock-items" element={<DeadlockItemParser />} />
    </Routes>
  );
};

export default AppRoutes;