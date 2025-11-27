import React from 'react'
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'
//here we did destructuring ..(prop)...{props.category}..
//it destructured like const{category} = props;

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id= 'explore-menu' >
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'> Choose from diverse menu featuring a delectable array of dishes crafted with finest ingredients and culinary expertise.</p>
        <div className='explore-menu-list'>

            {menu_list.map((item,index)=>{
                return(
                    
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"Active":""} src={item.menu_image} alt=''/>
                        <p>{item.menu_name}</p> 

                    </div>
                )
            })}
             
              </div>
              <hr />

      
    </div>
  )
}

export default ExploreMenu
