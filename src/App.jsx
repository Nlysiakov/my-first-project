import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import  Header  from "./components/Header.jsx"
import  Banner  from "./components/Banner.jsx"
import  ScrollableCard  from "./components/ScrollableCard.jsx";
import  Cards  from "./components/Cards.jsx";

import { CartPage } from "./pages/CartPage.jsx";
import { CartProvider } from "./context/useCart.jsx";
import { FavoritesProvider } from "./context/useFavorites.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import OrdersPage from "./pages/OrdersPage.jsx";


const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    if (loading) return <div>Загрузка...</div>;
    return currentUser ? children : <Navigate to="/login" replace />;
};

const App=()=>{

  const [category, setCategory]=useState("all")
  const [sorted, setSorted]=useState("default")
  const [searchValue, setSearchValue]=useState("")
  


  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter basename="/my-first-project">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route 
                path="/" 
                element={
                  <div className="main">
                    <Header 
                      category={category} 
                      setCategory={setCategory} 
                      sorted={sorted} 
                      setSorted={setSorted} 
                      setSearchValue={searchValue} 
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
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/orders" element={<OrdersPage/>}/>
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  )
};
export default App

