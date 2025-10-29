import React from 'react'

const ErrorStatus = ({ isLoading, isError, data, error }) => {

    if (isLoading) return <span>Loading todos...</span>
    if (isError) return <span>Something went wrong - {error}</span>
    if (!data.length) return <span>No tasks found!</span>
    return null;
}

export default ErrorStatus