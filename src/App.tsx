import React, { useEffect } from 'react';
import './App.css';
import { QueryEngine } from '@comunica/query-sparql-link-traversal-solid'

const myEngine = new QueryEngine()

function App() {
  useEffect(() => {
    (async () => {

      const bindingsStream = await myEngine.queryBindings(`
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX mypod: <https://mrkvon.solidcommunity.net/profile/card#>
        SELECT ?friend ?name
        WHERE {
          mypod:me foaf:knows ?friend.
          ?friend foaf:name ?name.
        }`, {
          sources: ['https://mrkvon.solidcommunity.net/profile/card'],
          lenient: true,
      });
      
      // Consume results as a stream (best performance)
      bindingsStream.on('data', (binding) => {
        console.log('************************')
          console.log(binding.toString()); // Quick way to print bindings for testing
      });
      bindingsStream.on('end', () => {
        console.log('finished .........................')
          // The data-listener will not be called anymore once we get here.
      });
      bindingsStream.on('error', (error) => {
          console.error(error);
      });
    })()
  }, [])
  return (
    <div className="App">
    </div>
  );
}

export default App;
