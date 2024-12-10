import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
    return (
        <Router>
            <Routes>
                {/* 방법 1: Navigate 사용 */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* 각 페이지 라우트 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Router>
    )
}

export default App
