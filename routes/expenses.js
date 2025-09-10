import express from 'express';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpense);     // Update an expense
router.delete('/:id', deleteExpense);  // Delete an expense

export default router;
