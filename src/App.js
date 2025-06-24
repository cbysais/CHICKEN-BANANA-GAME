import { Route, Routes } from 'react-router'

import LoginPage from './LoginPage'
import LandingPage from './LandingPage'

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/landing" element={<LandingPage />} />
        </Routes>
    )
}

export default App
