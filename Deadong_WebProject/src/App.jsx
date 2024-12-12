import React from 'react'
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ClubSearchPage from './pages/ClubSearchPage'
import ClubRegistrationPage from './pages/ClubRegistrationPage';
import ClubApplication from './pages/ClubApplication';
import AdminPage from './pages/AdminPage';
import ClubDetailPage from './pages/ClubDetailPage';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/clubs" element={<ClubSearchPage />} />
                <Route path="/register-club" element={<ClubRegistrationPage />} />
                <Route path="/club-application" element={<ClubApplication />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/clubs/:id" element={<ClubDetailPage />} />
            </Routes>
        </Router>
    )
}

export default App
