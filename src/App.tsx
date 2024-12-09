import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cep: '',
  });
  const [errors, setErrors] = useState({ name: '', email: '', cep: '' });
  const [list, setList] = useState([]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    // Revalida os campos no envio
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      cep: validateField('cep', formData.cep),
    };

    setErrors(newErrors);

    // Verifica erros
    if (Object.values(newErrors).some((err) => err !== '')) {
      return; 
    }

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.error) {
        alert(result.error);
      } else {
        alert('Usuário cadastrado com sucesso!');
        // Atualizar a lista de usuários
        setList([...list, result]);
        setFormData({ name: '', email: '', cep: '' }); // Limpar o formulário
        setErrors({ name: '', email: '', cep: '' }); // Limpar os erros
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) })); // Valida
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return 'O nome deve conter apenas letras e espaços.';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Email inválido.';
        }
        break;
      case 'cep':
        if (!/^\d+$/.test(value)) {
          return 'O CEP deve conter apenas números.';
        } else if (value.length !== 8) {
          return 'O CEP deve ter exatamente 8 dígitos.';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const handleEdit = (user) => {
    setFormData(user);
  };

  return (
    <>
      <div>
        <h2>Formulário</h2>
      </div>

      <form onSubmit={HandleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={HandleChange}
            style={{ marginBottom: '0.5rem' }}
          />
          {errors.name && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.name}</span>}

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={HandleChange}
            style={{ marginBottom: '0.5rem' }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.email}</span>}

          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={HandleChange}
            style={{ marginBottom: '0.5rem' }}
          />
          {errors.cep && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.cep}</span>}

          <button type="submit" style={{ marginTop: '1rem' }}>
            Enviar
          </button>
        </div>
      </form>

      <h3>Listagem de Usuários</h3>
      <ul>
        {list.map((user, index) => (
          <li key={index}>
            {user.name} - {user.email} - {user.cep}{' '}
            <button onClick={() => handleEdit(user)}>Editar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
