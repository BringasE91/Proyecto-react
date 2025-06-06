import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MyMovies from './components/MyMovies/MyMovies';
import FindMovies from './components/FindMovies/FindMovies';
import Home from './components/Home/Home';
import { AuthProvider } from './context/AuthContext';
import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {

  return (
  <AuthProvider>
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/my-movies' element={<ProtectedRoute><MyMovies /></ProtectedRoute>} />
        <Route path='/find-movies' element={<FindMovies />} />
      </Routes>
    </div>
  </AuthProvider>
  );
}

export default App;
