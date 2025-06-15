import { Request, Response } from 'express';
import Todo from '../models/todo.model';
import { createTodoSchema, updateTodoSchema } from '../validators/todo.validator';

export const addTodo = async (req: Request, res: Response) => {
  const parse = createTodoSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ errors: parse.error.errors });
  }
  try {
    const todo = await Todo.create(parse.data);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const parse = updateTodoSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ errors: parse.error.errors });
  }
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, parse.data, { new: true });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

export const listTodos = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    let query = {};
    if (filter === 'done') {
      query = { done: true };
    } else if (filter === 'upcoming') {
      query = { done: false, dateTime: { $gte: new Date() } };
    }
    const todos = await Todo.find(query).sort({ dateTime: 1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
}; 