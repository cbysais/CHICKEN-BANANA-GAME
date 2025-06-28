import { Route, Routes } from 'react-router'

import ChickenBananaGamePage from './ChickenBananaGamePage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<ChickenBananaGamePage />} />
        </Routes>
    )
}

export default App
