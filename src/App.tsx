import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import DetailPage from './pages/DetailPage';
import CommentPage from './pages/CommentPage';
import MyPage from './pages/MyPage';
import OnboardingPage from './pages/OnboardingPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/comment/:id" element={<CommentPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
