import { useState, useEffect, useRef } from 'react'
import './App.css';

function App() {
  const [movie, setMovies] = useState([]);
  const usernameRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    async function getMovies() {
      const response = await fetch("http://localhost:8080/api/v1/movies");
      const data = await response.json();
      console.log(data)
    };

    getMovies().catch(console.log);
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passRef.current.value;
    fetch("http://localhost:8080/api/v1/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    .then(response => response.json())
    .then(function (data) {
      console.log(data)
    }).catch(console.log)
  }

  return (
    <div className="App">
      <h1>Hola mundo</h1>
      <form onSubmit={onSubmit} style={{display:"flex", flexDirection: "column", gap: "1rem", alignItems: "start"}}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={usernameRef} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passRef} />
        <button>Enviar</button>
      </form>
    </div>
  )
}

export default App