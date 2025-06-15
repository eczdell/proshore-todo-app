import { Router } from 'express';
import { addTodo, updateTodo, deleteTodo, listTodos } from '../controllers/todo.controller';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the todo
 *         name:
 *           type: string
 *           description: The name of the todo
 *         shortDescription:
 *           type: string
 *           description: A short description of the todo
 *         dateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time for the todo
 *         done:
 *           type: boolean
 *           description: Whether the todo is done
 *       required:
 *         - name
 *         - shortDescription
 *         - dateTime
 *     TodoInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         shortDescription:
 *           type: string
 *         dateTime:
 *           type: string
 *           format: date-time
 *         done:
 *           type: boolean
 *       required:
 *         - name
 *         - shortDescription
 *         - dateTime
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: The created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Failed to add todo
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [done, upcoming]
 *         description: Filter todos by status
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Failed to fetch todos
 */
router.post('/', addTodo);
router.get('/', listTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       200:
 *         description: The updated todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Failed to update todo
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo id
 *     responses:
 *       200:
 *         description: Todo deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Failed to delete todo
 */
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router; 