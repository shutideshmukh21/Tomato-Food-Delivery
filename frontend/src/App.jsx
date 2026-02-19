import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlacOrder from './pages/PlaceOrder/PlacOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrders from './pages/MyOrders/MyOrders'
import SearchResult from './components/searchResult/SearchResult'


const App = () => {
      const [showLogin, setShowLogin] = useState(false);
        const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  return (

    <>
    {/* ✅ Toastify container (REQUIRED) */}
      <ToastContainer position="top-right" autoClose={3000} />
  {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className= "app">
      <Navbar  results= {results} setResults={setResults} 
        setShowResults={setShowResults}
        setShowLogin={setShowLogin}/>
              {showResults && <SearchResult results ={results}  setShowResults={setShowResults}/>}

<Routes>
  < Route path ='/' element={<Home/>} />
  <Route path='/cart' element ={<Cart/> } />
  <Route path ='/placeorder' element = {<PlacOrder/>} />
  <Route path ='/myorders' element = {<MyOrders/>}/>
  </Routes>     
    </div>
    <Footer/>
    </>
  )
}

export default App
