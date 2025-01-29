import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Cart from './pages/cart'
import NavBar from './components/nav-bar/nav-bar.jsx'

function App() {

  return (
    <div className='mx-auto container'>
      <NavBar />
      <div className='mx-auto container rounded-2xl p-5 lg:p-8 border-2 border-[#0d0d0d] mt-5 lg:mt-9'>
        <Routes>
          <Route
            exact
            path='/'
            element={<Home />}
          />
          <Route
            path='/cart'
            element={<Cart />}
          />
        </Routes>
      </div>

    </div>
  )
}

export default App
