import { Router } from 'express';
import { addTodo, updateTodo, deleteTodo, listTodos } from '../controllers/todo.controller';

const router = Router();

router.post('/', addTodo);
router.get('/', listTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router; 