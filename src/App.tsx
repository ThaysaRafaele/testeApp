
import { useState } from 'react';
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cep: ''
  })
  // onSubmit={handleSubmit}
  // value={dado do formdata}

  const HandleSubmit = (e) => {
    console.log('dados enviados');
  };

  const HandleChange = (e) => {
    const {name, value} = e.target;
    
    setFormData({...formData, [name]: value})
  };

  return (
    <>
      <div>
        <h2>Formulário</h2>
      </div>
      <h1>Vite + React</h1>
      
      <form onSubmit={HandleSubmit}>
        <div style={{display:'flex',  flexDirection: 'column', alignItems: 'center'}}>
          <label htmlFor="name">Nome: </label>
          <input type="text" name='name' value={formData.name} onChange={HandleChange} style={{marginBottom: '0.5rem'}}/>

          <label>Email: </label>
          <input type="email" name='email' value={formData.email} onChange={HandleChange} style={{marginBottom: '0.5rem'}}/>

          <label htmlFor="cep">CEP: </label>
          <input type="text" name='cep' value={formData.cep} onChange={HandleChange} style={{marginBottom: '0.5rem'}}/>

          <button onClick={HandleSubmit} style={{marginTop: '1rem'}}>Enviar</button>
          </div>
      </form>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
