import { useState } from "react";
import { useTodoStore } from "../store/todoStore";


const TodoList = () => {
  const { todos,  updateTodo, deleteTodo } = useTodoStore();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleUpdate = (id) => {
    if (!editText.trim()){
        alert('Todooo cannot be empty')
        return;
    };
    updateTodo(id, editText);
    console.log(todos)
    setEditId(null);
    setEditText("");
  };
  

  if (todos.length === 0) return <span>No todos available..</span>;

  return (
    <div>
      <h2>Zustand </h2>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            {editId === item.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleUpdate(item.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                >
                  {item.text}
                </span>
                <button
                  onClick={() => {
                    setEditId(item.id);
                    setEditText(item.text);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteTodo(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

