import React from 'react';
import { Todo, useTodoContext } from '../context/TodoContext';
import { updateTodo, deleteTodo as apiDeleteTodo } from '../utils/api';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { updateTodo: updateCtxTodo, deleteTodo: deleteCtxTodo } = useTodoContext();

  const handleDone = async () => {
    if (!todo._id) return;
    const updated = await updateTodo(todo._id, { done: !todo.done });
    updateCtxTodo(todo._id, updated);
  };

  const handleDelete = async () => {
    if (!todo._id) return;
    await apiDeleteTodo(todo._id);
    deleteCtxTodo(todo._id);
  };

  return (
    <li className={`flex justify-between items-center py-4 ${todo.done ? 'opacity-60' : ''}`}>
      <div>
        <strong className={`block text-lg ${todo.done ? 'line-through text-gray-500' : ''}`}>{todo.name}</strong>
        <span className="block text-gray-700">{todo.shortDescription}</span>
        <small className="block text-gray-400">{new Date(todo.dateTime).toLocaleString()}</small>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleDone}
          className={`px-3 py-1 rounded ${todo.done ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'} hover:opacity-90`}
        >
          {todo.done ? 'Undo' : 'Done'}
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem; 