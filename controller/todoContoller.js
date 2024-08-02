const Todo = require('../modal/todoModal');
const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const CsvParser = require("json2csv").Parser

// CRUD operations
const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTodoById = async (req, res) => {
    const id=req.params.id
    try {
        const todo = await Todo.findByPk(id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const { description, status } = req.body;
        const newTodo = await Todo.create({ description, status });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTodo = async (req, res) => {
    const Id=req.params.id
    try {
        const { description, status } = req.body;
        const [updated] = await Todo.update({ description, status }, { where: { id: Id } });
        if (updated) {
            const updatedTodo = await Todo.findByPk(req.params.id);
            res.json(updatedTodo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    const Id=req.params.id
    try {
        const deleted = await Todo.destroy({ where: { id: Id } });
        if (deleted) {
            res.status(200).json({"messase":"Todo has been deleted"});
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const filterTodos = async (req, res) => {
    try {
        const { status } = req.query;
        const todos = await Todo.findAll({ where: { status } });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const uploadTodos = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
  
      const filePath = path.join(__dirname, '../../uploads/', req.file.filename);
      const validStatuses = ['pending', 'completed']; 
  
      fs.createReadStream(filePath)
        .pipe(parse({ columns: true }))
        .on('data', async (row) => {
         
          if (!validStatuses.includes(row.status)) {
            console.error(`Invalid status value: ${row.status}`);
            return; // Skip the row or handle it as needed
          }
  
          await Todo.create(row);
        })
        .on('end', () => {
          fs.unlinkSync(filePath);
          res.status(200).json({ message: 'Todos uploaded successfully' });
        })
        .on('error', (error) => {
          fs.unlinkSync(filePath);
          res.status(500).json({ error: error.message });
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
const downloadTodos =(req, res) => {
    Todo.findAll().then((objs) => {
      let tutorials = [];
  
      objs.forEach((obj) => {
        const {  description, status } = obj;
        tutorials.push({  description, status });
      });
  
      const csvFields = ["Description", "status"];
      const csvParser = new CsvParser({ csvFields });
      const csvData = csvParser.parse(tutorials);
  
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=todo.csv");
  
      res.status(200).end(csvData);
    });
  };
  
  
  
  
  

module.exports={getAllTodos,getTodoById,createTodo,updateTodo,deleteTodo,filterTodos,uploadTodos,downloadTodos}