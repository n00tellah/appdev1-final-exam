import TodoItem from "./TodoItem";

function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos && todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList
