import { useState } from "react";
import { Link, useNavigate} from "react-router-dom"
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import "../styles.css"
import { useCart } from "../context/useCart";

const OrdersPage=()=>{

  const {order}=useCart()

  if(order !== undefined && order.length===0){
    return(
      <div className="main">
        <Header></Header>
        <div className="cart-container">
        <h2 className="text1">У вас нет заказов</h2>
        <p className="text2">Перейдите в каталог, чтобы сделать первый заказ</p>
        <Link to="/">
        <button className="back-btn">Перейти к покупкам</button>
        </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="main">

      <Header></Header>
        <div className="container">
        {order.map(item => (
          <div className="container__card" key={item.id}>
            <div className="container__image">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="card__text">
              <div className="card__price">${item.price}</div>
              <div className="card__title">{item.title}</div>
              <div className="card__rating">
                <img
                  className="container__star"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMf-0yhOK8t87CQ3auYVtcLzPuA6YnLCeRJA&s"
                  alt=""
                />
                {item.rating}
              </div>

              <div className="quantity">Кол-во: {item.quantity}</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default OrdersPage