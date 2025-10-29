import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todos: [
    { id: 1, text: "Todo 1", completed: false },
    { id: 2, text: "Todo 2 Completed", completed: true },
    { id: 3, text: "Todo 3 Completed", completed: true },
  ],

  updateTodo: (id, text) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, text } : t
      ),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((item) => item.id !== id),
    })),
}));
