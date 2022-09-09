import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import Bookmarks from './components/Bookmarks';
import Login from './components/Login';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const InputContext = React.createContext();
export const useInputContext = () => useContext(InputContext);

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const value = {
    inputValue,
    setInputValue,
  };

  return (
    <InputContext.Provider value={value}>
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
    </InputContext.Provider>
  );
};

export default App;
