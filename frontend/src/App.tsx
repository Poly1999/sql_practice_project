import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<RegisterPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/orders' element={<OrdersPage />} />
    </Routes>
  );
}

export default App;
