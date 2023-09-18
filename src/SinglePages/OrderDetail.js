import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
    let [items,SetItems]=useState([])
    const { id } = useParams();
    useEffect(()=> {
        getItems()
    },[id])

    let getItems= async()=>{
      let response= await fetch(`http://localhost:8000/api/orderdetails/${id}`,{
          method:'GET',
          headers:{
          'Content-Type': 'application/json'
          }
      })
      let data= await response.json()
      console.log(data)
      if(response.status===200){
        SetItems(data);
      }else {
        alert('something doesnt work')
      }

  }
  return (
    <div>
      <h4>delails</h4>
       <ul>
        {items.map(item=>(
          <li key={item.id}> {item.NameOfTheOrder} |||||{item.FullNameofTheProduct}  |||| {item.quantity} ||||{item.total_price} Dh </li>
        ))}
        </ul>
    </div>
  )
}

export default OrderDetail
