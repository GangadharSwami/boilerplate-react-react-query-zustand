import { create } from "zustand";

export const useTodoStore = create(
    // persist(
    (set) => ({
        todos: [
            { id: 1, text: "Todo 1", completed: false },
            { id: 2, text: "todo 2 compp", completed: true },
            { id: 3, text: "todo 2 compp", completed: true }
        ],
        updateTodo: (id, text) => set((state) => state.todos.map((t) => (t.id === id ? { ...t, text } : t))
        ),
        deleteTodo: (id) => set((state) => state.todos.filter((item) => item.id !== id))
    }),
    // {name : 'todo-storage'}))
)