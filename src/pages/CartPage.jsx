import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import Header from "../components/Header.jsx";
import "../styles.css"
import "../pageStyles/CartPageStyle.css"


export function CartPage(){
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    cardCount,
    totalPrice,
    toOrders
  }=useCart()

  if(cart.length===0){
    return (
      <div className="main">
        <Header></Header>
        <div className="cart-container">
        <h2 className="text1">Корзина пуста</h2>
        <div className="text2">Воспользуйтесь поиском, чтобы найти всё, что нужно.</div>
        <div className="text3">Если в Корзине были товары, войдите, чтобы посмотреть список</div>
        <Link to="/">
        <button className="back-btn">Вернуться к покупкам</button>
        </Link>
        </div>
      </div>
    )
  }

  return(
    <div className="main">
      <Header></Header>
      <div className="container">
      {cart.map(item => (
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

            <div style={{
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              right: "10px",
              cursor: "pointer"
            }}>
              <button onClick={()=>updateQuantity(item.id, item.quantity-1)}>-</button>
                <div>{item.quantity}</div>
              <button onClick={()=>updateQuantity(item.id, item.quantity+1)}>+</button>
            </div>

          </div>
          <button className="buy-button" onClick={()=>removeFromCart(item.id)}>Удалить</button>
        </div>
      ))}
    </div>
    <div className="total-price">Итого: {totalPrice} $</div>
      <div className="btn-container">
      <button className="clear-btn" onClick={clearCart}>Очистить корзину</button>
      <button className="confirm-btn" onClick={toOrders}>Оформить заказ</button>
      </div>
    </div>
  )
}

