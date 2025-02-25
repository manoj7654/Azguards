const express = require('express');
const { authenticate } = require('../middleware/authenticate');

const todoRouter = express.Router();


const { validationResult } = require('express-validator');
const { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, filterTodos, uploadTodos, downloadTodos } = require('../controller/todoContoller');
const { todoCreateValidation, todoUpdateValidation } = require('../validator/todoValidator');
const uploadFile = require('../middleware/uploadCsv');



// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - description
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the todo item
 *           example: 1
 *         description:
 *           type: string
 *           description: A brief description of the todo item
 *           example: Buy groceries
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - completed
 *           description: The status of the todo item
 *           example: pending
 *       example:
 *         description: Buy groceries
 *         status: pending
 */

/**
 * @swagger
 * /todos/download:
 *   get:
 *     summary: Download todos as a CSV file
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CSV file containing todos data
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *               description: The CSV file with todos data
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error message here
 */
todoRouter.get("/download",authenticate,downloadTodos)


/**
 * @swagger
 * /todos/filter:
 *   get:
 *     summary: Retrieve a list of todos filtered by status
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed]
 *         required: false
 *         description: The status of the todos to retrieve (e.g., 'pending' or 'completed')
 *     responses:
 *       200:
 *         description: A list of todos filtered by the specified status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *             example:
 *               - id: 1
 *                 description: "Complete the project report"
 *                 status: "pending"
 *               - id: 2
 *                 description: "Buy groceries"
 *                 status: "pending"
 *       400:
 *         description: Invalid status provided
 *       500:
 *         description: Server error
 */



todoRouter.get("/filter",authenticate,filterTodos)

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Retrieve a list of todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Server error
 */


todoRouter.get('/',authenticate, getAllTodos);


/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Retrieve a todo by its ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the todo to retrieve
 *     responses:
 *       200:
 *         description: Details of the requested todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */


todoRouter.get('/:id', getTodoById);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Add a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *           example:
 *             description: "Buy groceries"
 *             status: "pending"
 *     responses:
 *       201:
 *         description: Todo added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *             example:
 *               description: "Buy groceries"
 *               status: "pending"
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */





todoRouter.post('/', authenticate,todoCreateValidation,handleValidationErrors ,createTodo);


/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update an existing todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *           example:
 *             description: "Complete the project report"
 *             status: "completed"
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *             example:
 *               description: "Complete the project report"
 *               status: "completed"
 *       400:
 *         description: Validation error
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */


todoRouter.put('/:id',todoUpdateValidation,handleValidationErrors, authenticate,updateTodo);



/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete an existing todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the todo to delete
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */


todoRouter.delete('/:id',authenticate, deleteTodo);



/**
 * @swagger
 * /todos/upload:
 *   post:
 *     summary: Upload todos from a CSV file
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The CSV file containing todos to upload
 *     responses:
 *       200:
 *         description: Todos uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Todos uploaded successfully
 *       400:
 *         description: No file uploaded or invalid file format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No file uploaded.
 *       500:
 *         description: Server error or processing error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error message here
 */


todoRouter.post('/upload',authenticate, uploadFile.single('file'), uploadTodos);

module.exports = todoRouter;