import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import VotingPage from './pages/VotingPage';
import PrivateRoute from './components/PrivateRoute';
import UserProvider from './context/UserProvider';
import ElectionContext from './context/ElectionContext';
import AdminHomePage from './pages/AdminHomePage';
import NotFound from './pages/NotFound';


function App() {
  return (
    <>
      <UserProvider>
        <ElectionContext>
          <BrowserRouter>
            <Routes>
                <Route path='/' element={< LoginPage/>} />
                <Route path='/register' element={<RegisterPage />} />                   
            <Route path='/user' element={<PrivateRoute />}>
                <Route path='voting' element={<VotingPage />} />
                <Route path='admin' element={<AdminHomePage />} />
                <Route path='*' element={< NotFound />} />
              </Route>
              <Route path='*' element={< NotFound />} />
              <Route path='/user/' element={< NotFound/>} />
          </Routes>
        </BrowserRouter>
        </ElectionContext>
      </UserProvider>
    </>
  );
}

export default App;
