import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Todo = {
  _id?: string;
  name: string;
  shortDescription: string;
  dateTime: string;
  done?: boolean;
};

export type Filter = 'all' | 'done';

interface TodoContextType {
  todos: Todo[];
  filter: Filter;
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: Filter) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = (todo: Todo) => setTodos((prev) => [todo, ...prev]);
  const updateTodo = (id: string, todo: Partial<Todo>) =>
    setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, ...todo } : t)));
  const deleteTodo = (id: string) => setTodos((prev) => prev.filter((t) => t._id !== id));

  return (
    <TodoContext.Provider value={{ todos, filter, setTodos, addTodo, updateTodo, deleteTodo, setFilter }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodoContext must be used within TodoProvider');
  return ctx;
}; 