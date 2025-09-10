import express from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/tasksController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
//using protect
router.use(protect);

router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id', updateTask);      // Update a task
router.delete('/:id', deleteTask);   // Delete a task

export default router;
