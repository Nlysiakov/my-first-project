
import { useEffect, useRef, useState, useMemo } from "react"
import {Link} from "react-router-dom"

import { useCart } from "../context/useCart";
import { useFavorites } from "../context/useFavorites";

import userIcon from '../assets/user.svg';
import shoppingBag from '../assets/shopping-bag.svg'
import heart from '../assets/heart.svg'
import box from '../assets/package.svg'
import leaf from '../assets/feather.svg'
import creditCard from '../assets/credit-card.svg'
import anchor from '../assets/anchor.svg'
import briefcase from "../assets/briefcase.svg"

import "../pageStyles/HeaderStyle.css";


const Header=({category, setCategory, sorted, setSorted,setSearchValue, searchValue})=>{
  const [textButton, setTextButton]=useState("Везде")
  const [status, setStatus]=useState(false)
  const [inputValue, setInputValue]=useState("")
  const inputRef=useRef(null)

  const {totalItems}=useCart()
  const {favorites, totalFavoriteItems}=useFavorites()
  
  useEffect(()=>{
    if(category==="all"){
      setTextButton("Везде")
      inputRef.current.style.textIndent="60px"
    }else if(category==="beauty"){
      setTextButton("Красота")
      inputRef.current.style.textIndent="70px"
    }else if(category==="fragrances"){
      setTextButton("Парфюмерия")
      inputRef.current.style.textIndent="110px"
    }else if(category==="furniture"){
      setTextButton("Фурнитура")
      inputRef.current.style.textIndent="100px"
    }else if(category==="groceries"){
      setTextButton("Еда")
      inputRef.current.style.textIndent="50px"
    }
      
  },[category])

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setSearchValue(inputValue)
    },400)
    return ()=>clearTimeout(timer)
  },[inputValue])

  const handleSearch=(value)=>{
    setInputValue(value)
  }


  return (
    <div className="header">
    <div className="header__container">

      <div className="header__image">
        <img src="data:image/png;base64,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" alt="" />
      </div>

      <button className="btn__catalog">Каталог</button>

      <div className="input__wrapper">
      <input className="header__input" ref={inputRef} value={inputValue} onChange={(e)=>handleSearch(e.target.value)} placeholder="Искать на Ozon" type="text" />
      <a onClick={(e)=>{
        e.preventDefault() 
        setStatus(prev=>!prev)
      }} className="input__filter" href="">{textButton}</a>
      </div>

      <div className="filter__menu" style={{display: status ? "flex" : "none"}}>
        <div onClick={()=>setCategory("all")}>Везде</div>
        <div onClick={()=>setCategory("beauty")}>Красота</div>
        <div onClick={()=>setCategory("fragrances")}>Парфюмерия</div>
        <div onClick={()=>setCategory("furniture")}>Фурнитура</div>
        <div onClick={()=>setCategory("groceries")}>Еда</div>
        <div onClick={()=>setSorted("ratingDecrease")}>Рейтинг по убыванию</div>
        <div onClick={()=>setSorted("ratingIncrease")}>Рейтинг по возрастанию</div>
        <div onClick={()=>{setSorted("default"), setCategory("all")}}>Сбросить фильтры</div>
        <button className="filter__menu-close" onClick={()=>setStatus(false)}>X</button>
      </div>

      <div className="rightSideBar">
        <a href="">
          <img src={userIcon} alt="user" />
          <div>Войти</div>
        </a>

        <a href="">
          <img src={box} alt="" />
          <div>Заказы</div>
        </a>

        <Link to="/favorites">
          <img src={heart} alt="" />
          <div>Избранное</div>
          {totalFavoriteItems > 0 && (
            <span className="favorites-badge">{totalFavoriteItems}</span>
          )}
        </Link>

        <Link to="/cart" className="cart-link">
          <img src={shoppingBag} alt="" />
          <div>Корзина</div>
          {totalItems>0 &&(
            <span className="cart-badge">{totalItems}</span>
          )}
        </Link>
      </div>

    </div>

        <div className="bottomSideBar">

    <div className="bottomSideBar__container-left">

      <a href="">
        <img style={{
          height: "20px",
          width: "auto",
          alignItems: "center"
        }}src={leaf} alt="" />
        <div>Ozon fresh</div>
      </a>

      <a href="">
        <img style={{
          height: "20px",
          width: "auto",
          alignItems: "center"
        }}
        src={creditCard} alt="" />
        <div>Ozon Банк</div>
      </a>

      <a href="">
        <img style={{
          height: "20px",
          width: "auto",
          alignItems: "center"
        }}
        src={anchor} alt="" />
        <div>Билеты, отели</div>
      </a>

      <a href="">
        <img style={{
          height: "20px",
          width: "auto",
          alignItems: "center"
        }}
        src={briefcase} alt="" />
        <div>Для бизнеса</div>
      </a>

      <a href="">
        <div>Одежда</div>
      </a>

      <a href="">
        <div>Электроника</div>
      </a>

      <a href="">
        <div>Дом и сад</div>
      </a>

      <a href="">
        <div>Товары за 1р</div>
      </a>

      <a href="">
        <div>Сертификаты</div>
      </a>
    </div>


      <div className="bottomSideBar__container-right">
      <a href="">
        <div>Москва</div>
      </a>

      <a href="">
        <div>•</div>
      </a>

      <a href="">
        <div>Укажите адрес</div>
      </a>

      <a href="">
        <div>RU</div>
      </a>
</div>

    </div>


    </div>
  )
}
export default Header
