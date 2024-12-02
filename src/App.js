import React, { useState, useMemo } from "react";

// Child Component
const TodoList = React.memo(({ todos }) => {
  console.log("Child Component Rendered");

  return (
    <div>
      <h3>Todo List</h3>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
});

// Parent Component
const ParentComponent = () => {
  const [counter, setCounter] = useState(0);
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState(["Learn React", "Build a project"]);

  // Memoize the todos to prevent unnecessary re-renders
  const memoizedTodos = useMemo(() => todos, [todos]);

  const handleAddTodo = () => {
    if (todoInput.trim() === "") return;
    setTodos([...todos, todoInput]);
    setTodoInput(""); // Clear input after adding
  };

  console.log("Parent Component Rendered");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Parent Component</h2>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment Counter</button>

      <div style={{ marginTop: "20px" }}>
        <h3>Add Todo</h3>
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="New Todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      {/* Pass memoized todos to the Child Component */}
      <TodoList todos={memoizedTodos} />
    </div>
  );
};

export default ParentComponent;
