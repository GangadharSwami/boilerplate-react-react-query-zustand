import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTodo, deleteTodo, fetchTodo, updateTodo } from "../services/todo"

export const useTodoList = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodo,
        retry: 3,
        staleTime: 1000 * 60,
        refetchOnMount: false
    })
}

export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
            alert('Todo added successfully')
        },
        onError: (error) => {
            console.error('Failed to add todo', error.message)
        }
    })
}

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => updateTodo(),
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
        },
        onError: (error) => {
            console.error('Failed to delete todo', error.message)
        }
    })
}



export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
        },
        onError: (error) => {
            console.error('Failed to delete todo', error.message)
        }
    })
}