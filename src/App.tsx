import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Array<{ id: number; text: string; completed: boolean }>>([
    {
      id: 0,
      text: "Kod Yaz Evlat",
      completed: true,
    },
    {
      id: 1,
      text: "Daha çok kod yaz evlat",
      completed: false,
    },
  ]);

  const todoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const submitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    const newTodo = {
      id: todos.length + 1,
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const editTodo = (index: number) => {
    const newTodo = todos.map((todo, i) => {
      if (i === index) {
        const newText = prompt("Enter new todo", todo.text);
        todo.text = newText !== null ? newText : todo.text;
      }
      return todo;
    });
    setTodos(newTodo);
  };

  const doneTodo = (index: number) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="mx-auto container w-1/2 space-y-3">
      <h1 className="text-center font-bold text-3xl">TODO LIST</h1>
      <form action="" onSubmit={submitTodo} className="flex space-x-2">
        <input
          type="text"
          placeholder="Add Item"
          className="w-full border rounded-sm p-1"
          onChange={(e) => todoInputChange(e)}
          value={input}
        />
        <button type="submit" className="bg-black text-white p-1 rounded-md">
          ADD
        </button>
      </form>
      <ul>
        {todos?.length === 0 ? (
          <p className="text-center">No Todos</p>
        ) : (
          todos.map((todo, index) => (
            <li key={index} className="bg-gray-300 hover:bg-gray-400 flex items-center justify-between p-2">
              <p className={todo.completed ? `line-through` : "text-pretty"}>{todo.text}</p>
              <div className="space-x-4">
                <button
                  className="bg-gray-100 p-1 rounded-md hover:bg-gray-500 hover:text-white"
                  onClick={() => doneTodo(index)}
                >
                  Done
                </button>
                <button
                  className="bg-gray-100 p-1 rounded-md hover:bg-red-600 hover:text-white"
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-100 p-1 rounded-md hover:bg-gray-500 hover:text-white"
                  onClick={() => editTodo(index)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
