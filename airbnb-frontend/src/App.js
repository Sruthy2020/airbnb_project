import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import Allbookings from './pages/Allbookings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/all-bookings" element={<Allbookings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
