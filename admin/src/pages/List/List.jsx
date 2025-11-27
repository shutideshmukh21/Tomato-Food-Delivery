import React from 'react'
import './List.css'
import axios from 'axios'
import {toast} from "react-toastify"
import { useState } from 'react'
import { useEffect } from 'react'

const List = () => {
  const [list, setList] = useState([]);
  const url = " http://localhost:4000"

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data)
    if(response.data.success){
      setList(response.data.data);
      console.log(list)
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(()=> {fetchList();},[])
  
  return (
    <div>
 
    </div>
  )
}

export default List
