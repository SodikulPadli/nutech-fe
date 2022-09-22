import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import DataBarang from './pages/DataBarang';
import TambahBarang from './pages/TambahBarang';
import DetailBarang from './pages/DetailBarang';
import UbahBarang from './pages/UbahBarang';

import { UserContext } from './context/UserContext';
import { API, setAuthToken } from './config/api';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (!state.isLogin) {
      navigate('/');
    } else {
      navigate('/dashboard');
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      return dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DataBarang />} />
      <Route path="/product/:id" element={<DetailBarang />} />
      <Route path="/ubah/:id" element={<UbahBarang />} />
      <Route path="/add" element={<TambahBarang />} />
    </Routes>
  );
}

export default App;
