import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/useCart';
import { useFavorites } from '../context/useFavorites';

import Header from '../components/Header';
import '../styles.css'
import "../pageStyles/LoginPageStyle.css"

const LoginPage=()=>{
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [error, setError]=useState("")
  const { login, user, logout }=useAuth()
  const navigate=useNavigate()

  const { clearCartOnLogout } = useCart();
  const { clearFavoritesOnLogout } = useFavorites()

  const handleSubmit=(e)=>{
    e.preventDefault()
    setError("")
  
    const result=login(email, password)

    if(result.success){
      navigate("/")
    }else{
      setError(result.error)
    }
  }

  const handleLogout=()=>{
    logout()
    clearCartOnLogout()
    clearFavoritesOnLogout()
    navigate("/")
  }

  if(user){
    return <div>
      <div className="main">
            <Header />
            <div className="logout-container">
                <button className='logout-btn' onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    </div>
  }

return (
        <div className="main">
            <Header />
            <div className="auth-container">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Вход</h2>
                    
                    {error && <div className="auth-error">{error}</div>}
                    
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button className='login-btn' type="submit">Войти</button>
                    
                    <p className='no-acc'>Нет аккаунта?</p>
                    <Link to="/register" className='registration-link'>Зарегистрироваться</Link>
                </form>
            </div>
        </div>
    );
}

export default LoginPage
