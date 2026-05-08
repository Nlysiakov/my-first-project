import { useState, useEffect, createContext, useContext } from "react";

const CART_STORAGE_KEY="my_shop_cart"

const CartContext=createContext()

export function CartProvider({children}){
  const [cart, setCart]=useState([])
  const [isLoading, setIsLoading]=useState(true)

  useEffect(()=>{
    const savedCart=localStorage.getItem(CART_STORAGE_KEY)
    if(savedCart){
      setCart(JSON.parse(savedCart))
    }
    setIsLoading(false)
  },[])


useEffect(()=>{
  if(!isLoading){
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }
}, [cart, isLoading])

const addToCart=(product, quantity=1)=>{
  setCart(prev=>{
    const existingItem=prev.find(item=>item.id===product.id)

    if(existingItem){
      return prev.map(item=>
        item.id===product.id
        ? {...item, quantity:item.quantity+quantity}
        : item
      )
    }else{
      return [...prev, {...product, quantity}]
    }
  })
}


const removeFromCart=(productId)=>{
  setCart(prev=>prev.filter(item=>item.id!==productId))
}

const updateQuantity=(productId, quantity)=>{
  if(quantity<=0){
    removeFromCart(productId)
    return
  }
  setCart(prev=>
    prev.map(item=>
      item.id===productId ? {...item, quantity} : item
    )
  )
}

const clearCart=()=>{
  setCart([])
}

const getTotalItems=()=>{
  return cart.reduce((acc, item)=>acc+item.quantity, 0)
}


const getTotalPrice=()=>{
  return cart.reduce((acc, item)=>acc+(item.price*item.quantity),0)
}



const totalItems=cart.reduce((acc, item)=>acc+item.quantity, 0)
const totalPrice=cart.reduce((acc, item)=>acc+(item.price*item.quantity),0)

return(
  <CartContext.Provider value={{
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    totalItems,
    totalPrice,
  }}>
    {children}
  </CartContext.Provider>
  )
}

export function useCart(){
  const  context=useContext(CartContext)
  if(!context){
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}