import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useFavorites } from "../context/useFavorites.jsx";
import Header from "../components/Header.jsx";
import "../styles.css"
import "../pageStyles/FavoritesPageStyle.css"

const FavoritesPage=()=>{

  const {
    favorites,
    isFavorite,
    addToFavorites,
    removeFavorites,
    toggleFavorite
  }=useFavorites()

  const { addToCart }=useCart()

  if(favorites.length===0){
    return (
      <div>
        <div className="main">
          <Header></Header>
          <div className="favorites-container">
          <h2 className="text1">В избранном пока пусто</h2>
          <div className="text2">Добавляйте товары с помощью ❤️, чтобы не потерять их и купить позже</div>
          </div>
          <Link to="/">
          <button className="back-btn">Вернуться к покупкам</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="main">
      <Header></Header>
      <div className="container">

      {favorites.map(item => (
        <div className="container__card" key={item.id}>
          <button className="like__button" onClick={()=>toggleFavorite(item)}>❤️</button>
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

          </div>
          <button className="buy-button" onClick={()=>addToCart(item)}>В корзину</button>
        </div>
      ))}
      </div>
    </div>
  )
}
export default FavoritesPage