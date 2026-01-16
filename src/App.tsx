import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard'; // Move your current dashboard code here
import About from './About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
