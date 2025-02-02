import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ComicList from './pages/ComicList/ComicList';
import LearnComic from './pages/LearnComic/LearnComic';
import LearnCharacter from './pages/LearnCharacter/LearnCharacter';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/comics/:characterId' element={<ComicList />} />
        <Route path='/learn-comic/:comicId' element={<LearnComic />} />
        <Route path='/learn-character/:characterId' element={<LearnCharacter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;