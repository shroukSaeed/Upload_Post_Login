import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IsLoggedin from './components/IsLoggedin';

function App() {

  const isAuth = useSelector(state => state.authReducer.isAuth);
  const userId = useSelector(state => state.authReducer.userId);
  const dispatch = useDispatch();

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<IsLoggedin type="notIsAuth"><Register /></IsLoggedin>} />
        <Route path='/login' element={<IsLoggedin type="notIsAuth"><Login /> </IsLoggedin>} />
        <Route path='/home' element={<IsLoggedin type="isAuth"><Home /></IsLoggedin> } />
        <Route path='*' element={<NotFound />} />
      </Routes>

      {/* <Register/>
      <Login/>
      <Home/>
      <NotFound/> */}
    </div>
  );
}

export default App;
