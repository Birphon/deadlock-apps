import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;