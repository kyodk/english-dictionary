import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import Bookmarks from './components/Bookmarks';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthContextProvider } from './contexts/AuthContext';
import { InputContextProvider } from './contexts/InputContext';
import { SaveContextProvider } from './contexts/SaveContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <AuthContextProvider>
      <InputContextProvider>
        <SaveContextProvider>
          <BrowserRouter>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
          </BrowserRouter>
        </SaveContextProvider>
      </InputContextProvider>
    </AuthContextProvider>
  );
};

export default App;
