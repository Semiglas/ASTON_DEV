import React from 'react'
import { AppRoutes } from './routes/AppRoutes'
import Header from './components/Header'
import { BrowserRouter } from 'react-router-dom'
function App() {
    return (
        <div>
            <Header />
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </div>
    )
}

export default App
