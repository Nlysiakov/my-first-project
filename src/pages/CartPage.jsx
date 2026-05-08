import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import Header from "../components/Header.jsx";
import "../styles.css"


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
  }=useCart()

  if(cart.length===0){
    return (
      <div>
        <Header></Header>
        <h2>Корзина пуста</h2>
        <div>Воспользуйтесь поиском, чтобы найти всё, что нужно.</div>
        <div>Если в Корзине были товары, войдите, чтобы посмотреть список</div>
        <Link to="/">
        <button>Вернуться к покупкам</button>
        </Link>
      </div>
    )
  }

  return(
    <div>
      <Header></Header>
      <div className="container">
      {cart.map(item => (
        <div className="container__card" key={item.id}>
          {/* <button className="like__button" onClick={()=>handleLike(item.id)}>{likedIds.includes(item.id) ? '❤️' : '🤍'}</button> */}
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
    <div>Итого: {totalPrice}</div>
      <button onClick={clearCart}>Очистить корзину</button>
    </div>
  )
}

