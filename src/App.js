import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavComponent from './components/Navbar/navbar';
import ViewUnitPage from './pages/view-unit-page';
import ViewPage from './pages/ViewPage';

// Lazy-load pages
const Home = React.lazy(() => import('./pages/home'));
const Competency = React.lazy(() => import('./pages/competency'));
const Unit = React.lazy(() => import('./pages/unit'));
const CreateUnit = React.lazy(() => import('./pages/createUnit'));

const CreateCompetency = React.lazy(() => import('./pages/createCompetency'));
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
          <Route path="/unit/view/:unitId" element={<ViewUnitPage />} />
          <Route path="/create-competency" element={<CreateCompetency />} />
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/unit/create" element={<CreateUnit />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
