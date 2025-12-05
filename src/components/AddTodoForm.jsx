import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../Reducer/todosSlice.js";

function AddTodoForm () {
  const [title, setTitle] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() === "") return
    dispatch(addTodo(title))
    setTitle("")
  }

  useEffect(() => {
    // Apply saved theme to form elements
    const savedTheme = localStorage.getItem('savedTheme') || 'standard'
    const inputElement = document.querySelector('.todo-input')
    const buttonElement = document.querySelector('.todo-btn')
    
    if (inputElement) inputElement.className = `todo-input ${savedTheme}-input`
    if (buttonElement) buttonElement.className = `todo-btn ${savedTheme}-button`
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <input 
        className="todo-input standard-input" 
        type="text" 
        placeholder="Add a task." 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="todo-btn standard-button" type="submit">
        I Got This!
      </button>
    </form>
  )
}

export default AddTodoForm
