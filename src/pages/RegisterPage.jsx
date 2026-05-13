import { useState } from "react";
import { Link, useNavigate} from "react-router-dom"
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

import "../styles.css"



    const RegisterPage=()=>{
    const [name, setName]=useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        setError("")
        
        const result=register(email, password, name)

        if(result.success){
        navigate("/")
        }else{
        setError(result.error)
        }
    }

return (
        <div className="main">
            <Header />
            <div className="auth-container">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Регистрация</h2>
                    
                    {error && <div className="auth-error">{error}</div>}
                    
                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    
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
                        minLength={6}
                    />
                    
                    <button className="registration-btn" type="submit">Зарегистрироваться</button>
                    
                    <p className="no-acc">Уже есть аккаунт?</p>
                    <Link className="registration-link" to="/login">Войти</Link>
                </form>
            </div>
        </div>
    );
}
export default RegisterPage;