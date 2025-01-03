import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;