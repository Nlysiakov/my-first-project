import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import  Header  from "./components/Header.jsx"
import  Banner  from "./components/Banner.jsx"
import  ScrollableCard  from "./components/ScrollableCard.jsx";
import  Cards  from "./components/Cards.jsx";

import { CartPage } from "./pages/CartPage.jsx";
import { CartProvider } from "./context/useCart.jsx";
import { FavoritesProvider } from "./context/useFavorites.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";



const App=()=>{

  const [category, setCategory]=useState("all")
  const [sorted, setSorted]=useState("default")
  const [searchValue, setSearchValue]=useState("")
  


  return (
    <CartProvider>
      <FavoritesProvider>
        <BrowserRouter basename="/my-first-project">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="main">
                  <Header 
                    category={category} 
                    setCategory={setCategory} 
                    sorted={sorted} 
                    setSorted={setSorted} 
                    setSearchValue={setSearchValue} 
                    searchValue={searchValue} 
                    />
                  <Banner />
                  <ScrollableCard />
                  <Cards 
                    category={category} 
                    sorted={sorted} 
                    searchValue={searchValue} 
                    />
                </div>
              } 
              />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage/>}/>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  );
};
export default App