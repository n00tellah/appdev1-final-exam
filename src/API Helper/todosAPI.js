import axios from "axios";

export const getTodosAPI = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then(res => res.data);
};

export const addTodoAPI = (todo) => {
  return axios.post("https://jsonplaceholder.typicode.com/todos", todo)
    .then(res => res.data);
};

export const updateTodoAPI = (todo) => {
  return axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo)
    .then(res => res.data);
};

export const deleteTodoAPI = (id) => {
  return axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(() => id);
};
