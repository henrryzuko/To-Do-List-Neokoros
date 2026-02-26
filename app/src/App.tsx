import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>

        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }/>

        <Route path="*" element={<LoginPage />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
