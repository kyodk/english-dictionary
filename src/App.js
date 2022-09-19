import React, { useState, useEffect, useContext } from 'react';
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
export const SaveContext = React.createContext();
export const useSaveContext = () => useContext(SaveContext);

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [saved, setSaved] = useState(false);
  const value = {
    inputValue,
    setInputValue,
  };
  const savedValue = {
    saved,
    setSaved,
  };

  useEffect(() => {
    setSaved(false);
  }, []);

  return (
    <InputContext.Provider value={value}>
      <SaveContext.Provider value={savedValue}>
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
      </SaveContext.Provider>
    </InputContext.Provider>
  );
};

export default App;
