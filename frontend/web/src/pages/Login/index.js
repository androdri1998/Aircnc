import React, {useState} from 'react';
import api from '../../services/api';
import '../../App.css';

function Login({history}) {

  const [email, setEmail] = useState("");

  async function handleSubmit(ev) {
    ev.preventDefault();
    
    const response = await api.post('/sessions', {email});

    const { _id } = response.data;
    
    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }

  function handlerEmailChange(event){
    setEmail(event.target.value);
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para progrmaadores e encontre <strong>talentos</strong> para sua empresa.
      </p>

      <form onSubmit={handleSubmit} >
        <label htmlFor="email">E-MAIL *</label>
        <input 
          onChange={handlerEmailChange}
          value={email}
          type="email" 
          id="email" 
          placeholder="Seu melhor email"
        />

        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  );
}

export default Login;
