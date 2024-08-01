const express = require('express');
const { authenticate } = require('../middleware/authenticate');

const todoRouter = express.Router();


const { validationResult } = require('express-validator');
const { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, filterTodos } = require('../controller/todoContoller');
const { todoCreateValidation, todoUpdateValidation } = require('../validator/todoValidator');



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
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: A brief description of the product
 *         price:
 *           type: number
 *           format: decimal
 *           description: The price of the product
 *         categoryId:
 *           type: integer
 *           description: The ID of the category the product belongs to
 *       example:
 *         name: Product Name
 *         description: Product description
 *         price: 99.99
 *         categoryId: 2
 */
todoRouter.get("/filter",authenticate,filterTodos)

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

todoRouter.get('/',authenticate, getAllTodos);


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by its ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Details of the requested product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */


todoRouter.get('/:id', getTodoById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */





todoRouter.post('/', authenticate,todoCreateValidation,handleValidationErrors ,createTodo);


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */


todoRouter.put('/:id',todoUpdateValidation,handleValidationErrors, authenticate,updateTodo);



/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete an existing product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to delete
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */


todoRouter.delete('/:id',authenticate, deleteTodo);




module.exports = todoRouter;