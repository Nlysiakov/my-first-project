import { useState, useEffect, createContext, useContext } from "react";

const FAVORITES_STORAGE_KEY = "my_shop_favorites"
const FavoritesContext=createContext()

export function FavoritesProvider({children}){

  const [favorites, setFavorites]=useState([])
  const [isLoading, setIsLoading]=useState(true)
  
useEffect(()=>{
  const savedFavorites=JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY))
  if(savedFavorites){
    setFavorites(savedFavorites)
  }
  setIsLoading(false)
},[])

useEffect(()=>{
  if(!isLoading){
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  }
},[favorites, isLoading])

const isFavorite=(product)=>{
  return favorites.some(item=>item.id===product.id)
}

const addToFavorites=(product)=>{
  setFavorites(prev=>[...prev, product])
}

const removeFavorites=(productId)=>{
  setFavorites(prev=>prev.filter(item=>item.id!==productId))
}

const toggleFavorite=(product)=>{
  const exists=favorites.some(item=>item.id===product.id)
  if(exists){
    removeFavorites(product.id)
  }else{
    addToFavorites(product)
  }
}

const totalFavoriteItems=favorites.length

return (
  <FavoritesContext.Provider value={{
    favorites,
    isFavorite,
    addToFavorites,
    removeFavorites,
    toggleFavorite,
    totalFavoriteItems
  }}>
    {children}
  </FavoritesContext.Provider>
  )
}

export function useFavorites(){
  const context=useContext(FavoritesContext)
  if(!context){
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}