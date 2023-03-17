import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {
  const [id, setId] = useState('')
  const [nome, setNome] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Id: ${id} Nome: ${nome}`);
  };

  useEffect(() => {
    var axiosConfig = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }

    axios.post('http://localhost:7000/auth', {
      id,
      nome
    }).then(res => {
      var token = res.data.token
      localStorage.setItem('token', token)
      axiosConfig.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }).catch(() => {
      console.log('Login incorreto')
    })
  }, [id, nome])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' name='id' id='id' placeholder='Id' value={id} onChange={(e) => setId(e.target.value)} />
        <input type='text' name='nome' id='nome' placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} />
        <button>Gerar Token</button>
      </form>
    </div>
  );
}

export default App;
