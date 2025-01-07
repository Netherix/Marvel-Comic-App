import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import ComicList from './views/ComicList/ComicList';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/comics/:characterId' element={<ComicList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;