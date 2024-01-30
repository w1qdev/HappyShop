import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/BasketPage/MainPage/MainPage'
import BasketPage from './pages/BasketPage/BasketPage'
import Header from './layout/Header/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() { 

    return (
        <>
            <Routes>
                <Route path='/' element={<Header />}>
                    <Route path='' element={<MainPage />} />
                    <Route path='basket' element={<BasketPage />} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    )
}

export default App
