import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import Navbar from './components/Navbar/Navbar';
import AdminAccounts from './pages/AdminAccounts/AdminAccounts';
import UserAccounts from './pages/UserAccounts/UserAccounts';
import Classes from './pages/Classes/Classes';

export default function App() {
  const isSignedIn = true;
  return (
    <div className="App">
      {isSignedIn ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admins" element={<AdminAccounts />} />
            <Route path="/users" element={<UserAccounts />} />
            <Route path="/classes" element={<Classes />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<Navigate replace to="/signin" />} />
        </Routes>
      )}
    </div>
  );
}
