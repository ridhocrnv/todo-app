const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

router.use(auth);

router.get('/', getTodos);           // ambil semua todo milik user
router.post('/', createTodo);        // tambah todo baru
router.put('/:id', updateTodo);     // update todo tertentu
router.delete('/:id', deleteTodo);  // hapus todo tertentu

module.exports = router;
