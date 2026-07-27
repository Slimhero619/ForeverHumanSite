import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ThoughtsPage from './pages/ThoughtsPage'
import CreatorsPage from './pages/CreatorsPage'
import CreatorApplicationPage from './pages/CreatorApplicationPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/thoughts" element={<ThoughtsPage />} />
            <Route path="/creators" element={<CreatorsPage />} />
            <Route path="/creators/apply" element={<CreatorApplicationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
