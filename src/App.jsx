import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage';
import Navbar from './components/Navbar/Navbar';
import AdminAccounts from './pages/AdminAccounts/AdminAccounts';
import UserAccounts from './pages/UserAccounts/UserAccounts';
import Classes from './pages/Classes/Classes';
import UserDetail from './pages/UserDetail/UserDetail';
import AdminDetail from './pages/AdminDetail/AdminDetail';
import ClassDetail from './pages/ClassDetail/ClassDetail';
import { useDispatch } from 'react-redux';
import { checkAutoLogin } from './store/auth/auth-services';
import { useSelector } from 'react-redux';

export default function App() {
  const isSignedIn = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    checkAutoLogin(dispatch, navigate, location);
  }, [dispatch]);

  const authContent = (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/admins" />} />
        <Route path="/signin" element={<Navigate replace to="/admins" />} />
        <Route path="/admins" element={<AdminAccounts />} />
        <Route path="/admins/:adminId" element={<AdminDetail />} />
        <Route path="/users" element={<UserAccounts />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/:classId" element={<ClassDetail />} />
      </Routes>
    </>
  );

  const unAuthContent = (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="*" element={<Navigate replace to="/signin" />} />
    </Routes>
  );

  const routedContent = isSignedIn ? authContent : unAuthContent;
  return <div className="App">{routedContent}</div>;
}
