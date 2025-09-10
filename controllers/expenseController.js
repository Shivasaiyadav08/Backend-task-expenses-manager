import Expense from '../models/Expense.js';

// Get all expenses
export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
};

// Add a new expense
export const addExpense = async (req, res) => {
  const { title, amount, category } = req.body;
  const expense = await Expense.create({ user: req.user._id, title, amount, category });
  res.status(201).json(expense);
};

// Update an expense
export const updateExpense = async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
  if (!expense) return res.status(404).json({ message: 'Expense not found' });

  expense.title = req.body.title || expense.title;
  expense.amount = req.body.amount !== undefined ? req.body.amount : expense.amount;
  expense.category = req.body.category || expense.category;

  await expense.save();
  res.json(expense);
};

// Delete an expense
export const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!expense) return res.status(404).json({ message: 'Expense not found' });

  res.json({ message: 'Expense deleted' });
};
