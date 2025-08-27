import { Route, Routes } from 'react-router-dom';
// import Homepage from './Homepage';
// import DeadlockItemParser from './apps/deadlock-item-parser';
import StatLock from './apps/statlock';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/statlock" element={<StatLock />} />
    </Routes>
  );
};

export default AppRoutes;