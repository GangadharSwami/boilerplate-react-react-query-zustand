const AddTodo = ({ todo, setTodo, onAdd, isPending }) => {
    return (
        <div>
            <input value={todo} name='Todo' type='text' placeholder='Enter your task..' onChange={(e) => setTodo(e.target.value)} />
            <button onClick={onAdd} disabled={isPending}>{isPending ? 'Adding Task' : 'Add Todo'}</button>
        </div>
    )
}
export default AddTodo;