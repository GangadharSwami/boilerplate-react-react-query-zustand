import { useState } from "react";
import { useUpdateTodo } from "../../hooks/useTodo";

const TodoItem = ({ data, onDelete }) => {
    const [editedText, setEditedText] = useState('')
    const [isCheck, setIsCheck] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const { mutate } = useUpdateTodo();

    const handleEdit = (id) => {
        mutate(id, { title: editedText, completed: true })
        setIsEdit((prev) => !prev)
    }
    return (
        <>
            <div key={data.id}>
                <input type="checkbox" value={isCheck} checked={isCheck} onChange={(e) => setIsCheck(e.target.checked)} />
                {isEdit ? <>
                    <input value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                </> :
                    <>{data.title}</>}

                {isEdit ?
                    <button onClick={() => handleEdit(data.id)}>Save</button>
                    :
                    <button onClick={(data) => setIsEdit(!data.id)}>Edit</button>

                }
                <button onClick={() => onDelete(data.id)}>Delete</button>
            </div>
        </>
    )
}
export default TodoItem;