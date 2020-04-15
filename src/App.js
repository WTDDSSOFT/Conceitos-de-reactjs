import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repository, setReposioty] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      return setReposioty(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `React Native ${Date.now()}`,
      owner: "william torres dias dos santos",
    });

    const newRepository = response.data;

    setReposioty([...repository, newRepository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    //assim que faz a remoção de repositorios will

    const repositoriesIndex = repository.findIndex((repo) => repo.id === id);

    repository.splice(repositoriesIndex, 1);

    setReposioty([...repository]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
