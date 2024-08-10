import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import MenuPage from './pages/MenuPage';
import DetailPage from './pages/DetailPage';
import CommentPage from './pages/CommentPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/comment/:id" element={<CommentPage />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
