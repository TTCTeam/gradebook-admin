import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import Navbar from './components/Navbar/Navbar';

export default function App() {
  const isSignedIn = false;
  return (
    <div>
      {isSignedIn ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
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
