import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import VotingPage from './pages/VotingPage';
import VotingResult from './components/VotingResult';
import PrivateRoute from './auth/PrivateRoute';
import UserProvider from './context/UserProvider';
import ElectionContext from './context/ElectionContext';

function App() {
  return (
    <>
      <UserProvider>
        <ElectionContext>
          <BrowserRouter>
            <Header />
        <Routes>
          <Route path='/' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/user' element={<PrivateRoute />}>
            <Route path='voting' element={<VotingPage />} />
            <Route path='admin' element={<VotingResult />} />
          </Route>
        </Routes>
        </BrowserRouter>
        </ElectionContext>
      </UserProvider>
    </>
  );
}

export default App;
