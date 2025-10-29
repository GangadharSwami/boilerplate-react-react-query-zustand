export const fetchTodo = async () => {
    try {
        const response = await fetch('api/todos');
        if (!response.ok) {
            throw new Error('Fetch failed', response.statusText)
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Failed to fetch', err.message);
        throw err;
    }
}

export const addTodo = async (postData) => {
    try {
        const response = await fetch('api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error('Fetch failed', response.statusText)
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Failed to fetch', err.message);
        throw err;
    }
}

export const updateTodo = async (id, postData) => {
    try {
        const response = await fetch(`api/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error('Fetch failed', response.statusText)
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Failed to fetch', err.message);
        throw err;
    }
}


export const deleteTodo = async (id) => {
    try {
        const response = await fetch(`api/todos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Fetch failed', response.statusText)
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Failed to fetch', err.message);
        throw err;
    }
}

