import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  }, []);

  function createTodo() {
    const content = window.prompt("Enter todo content:");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  return (
    <main>
      <h1>My Todos</h1>
      <button onClick={createTodo}>+ New</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>

      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review the next step of this tutorial.
        </a>
      </div>

      <div>
        <h2>External Resource</h2>
        <iframe
          src="https://neginheidari.com"
          width="100%"
          height="500px"
          style={{ border: "none" }}
          title="W3Schools"
        ></iframe>
      </div>
    </main>
  );
}

export default App;