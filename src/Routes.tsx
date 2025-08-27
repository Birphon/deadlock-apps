// src/Routes.tsx

import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import StatLock from './apps/statlock';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/statlock" element={<StatLock />} />
      {/* Future routes for other apps */}
      {/* <Route path="/itemlock" element={<ItemLock />} /> */}
    </Routes>
  );
};

export default AppRoutes;