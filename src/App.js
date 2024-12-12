import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavComponent from './components/Navbar/navbar';
import ViewPage from './pages/ViewPage';

// Lazy-load pages
const Home = React.lazy(() => import('./pages/home'));
const Competency = React.lazy(() => import('./pages/competency'));
const Unit = React.lazy(() => import('./pages/unit'));

function App() {
  return (
    <Router>
      <NavComponent />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competency" element={<Competency />} />
          <Route path="view/:id" element={<ViewPage />} />
          <Route path="/unit" element={<Unit />} />
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
