import React, { useEffect, useState } from 'react';
import api from './services/api';

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente filho
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'


function App() {

  const [ devs, setDevs ] = useState([]);


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, [])

  async function handleAddDev(data) {

    const response = await api.post('/devs', data);

    console.log(data);

    setDevs([...devs, response.data]);
  }

  async function deleteDev(dev) {
    const { github_username } = dev;
    
    const response = await api.delete('/devs', { github_username } );

    console.log({ github_username });

    if( response.data.deletedCount > 0 )
    {
      setDevs(devs.filter(dev => (dev.github_username !== github_username)));
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onDelete={deleteDev}/>
          ))} 
        </ul>
      </main>
    </div>
  );
}

export default App;
