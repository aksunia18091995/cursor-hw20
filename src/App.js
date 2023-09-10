import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App = () => {
  return (
    <BrowserRouter>
      <nav className="navigation">
        <Link to="/login">Вхід</Link>
        <Link to="/register">Реєстрація</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
