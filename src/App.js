import { Route, Routes } from 'react-router'

import LoginPage from './LoginPage'
import LandingPage from './LandingPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default App
