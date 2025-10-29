import React, { useState } from 'react'
import { useAddTodo, useDeleteTodo, useTodoList, useUpdateTodo } from '../hooks/useTodo'
import AddTodo from './ui/AddTodo';
import TodoItem from './ui/TodoItem';

const TodoList = () => {
    const [todo, setTodo] = useState('')
    const { data: todoList, isError, error, isLoading } = useTodoList();
    const { mutate: addTodo, isPending } = useAddTodo();
    const { mutate: delTodo } = useDeleteTodo();

    if (isLoading) return <span>Loading todos...</span>
    if (isError) return <span>Something went wrong - {error}</span>
    if (!todoList.length) return <span>No tasks found!</span>

    const handleAdd = () => {
        if (!todo.trim()) {
            alert('Please Enter the input');
            return;
        }
        addTodo({ title: todo })
        setTodo('')
    }

    const handleDelete = (id) => {
        delTodo(id)
    }

    return (
        <div>TodoList
            <AddTodo todo={todo} setTodo={setTodo} onAdd={handleAdd} isPending={isPending} />
            {todoList.map((item) => (
                <TodoItem key={item.id} data={item} onDelete={handleDelete} />
            ))}
            
        </div>
    )
}

export default TodoList



