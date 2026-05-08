import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useFavorites } from "../context/useFavorites.jsx";
import Header from "../components/Header.jsx";
import "../styles.css"

const FavoritesPage=()=>{

  const {
    favorites,
    isFavorite,
    addToFavorites,
    removeFavorites,
    toggleFavorite
  }=useFavorites()

  if(favorites.length===0){
    return (
      <div>
        <Header></Header>
        <p>Страница избранного пуста</p>
        <Link to="/">
        <button>Вернуться к покупкам</button>
        </Link>
      </div>
    )
  }

  return (
    <div>
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
          <button className="buy-button" onClick={()=>removeFavorites(item.id)}>Удалить</button>
        </div>
      ))}
      </div>
    </div>
  )
}
export default FavoritesPage