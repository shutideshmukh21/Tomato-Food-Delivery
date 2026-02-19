import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../Contexts/StoreContext'
import axios from 'axios';
import {useEffect} from 'react'



const Navbar = ({results,setShowLogin, setResults, setShowResults}) => {

    const [keyword, setkeyword] = useState("");

const handleSearch= async()=>{
if(!keyword.trim()) return;

const response = await axios.get(`http://localhost:4000/api/food/search?keyword=${keyword}`);
setResults(response.data.data);
console.log(results);
setShowResults(true);
}

useEffect(() => {
  if (keyword.trim() === "") {
    setResults([]);
  }
}, [keyword]);

    const{getTotalCartAmount, token , setToken} = useContext(StoreContext);

    const[menu, setMenu] =useState("home");
    
    const navigate = useNavigate();
    const logout =()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
      
    }
  return (
    
      <div className = "navbar">
        
          <img src={assets.logo} alt="Website Logo"/>
         
                <ul className="navbar-menu">
                    <Link to='/' onClick={()=> setMenu("home")} className = { menu==="home"?"active": "" }>Home</Link>
                    <a href="#explore-menu" onClick={()=> setMenu("menu")}className = { menu==="menu"?"active": "" }>Menu</a>
                    <a href="#app-download" onClick={()=> setMenu("mobile-app")}className = { menu==="mobile-app"?"active": "" }>Mobile App</a>
                    <a href="#footer" onClick={()=> setMenu("contact-us")}className = { menu==="contact-us"?"active": "" }>Contact Us</a>  
                </ul>
           
        
            <div className="navbar-right">
                <div className = "search-container">
                <img src = {assets.search_icon} alt="" />
                 <input value= {keyword} type = "text" placeholder ="Search here" onChange={(e)=>{setkeyword(e.target.value)}}/>
                 <button onClick={handleSearch}>Search</button>

                </div>   
                <div className="navbar-search-icon">
                    <Link to='/cart'> <img src={assets.basket_icon} alt=""/></Link>
                    <div className={getTotalCartAmount() >0 ? "dot":""}></div>
                </div>
                <div>
                {!token?<button onClick={()=>setShowLogin(true)} >Sign In</button>:<div className='navbar-profile'>
                    <img src={assets.profile_icon} alt=""/>
                    <ul className='nav-profile-dropdown'>
                        <li onClick={()=>{navigate('/myorders')}}><img src={assets.bag_icon}/>Orders</li>
                        <hr/>
                        <li onClick ={logout}><img src={assets.logout_icon}/>Logout</li></ul></div>}
                 </div>
            </div>

      </div>
   
  )
}

export default Navbar
