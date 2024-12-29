import React, { useState } from "react";

function ExpenseForm({ onAddExpense }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("necessity");

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      amount: parseFloat(amount),
      description,
      category,
    };
    onAddExpense(expense);
    setAmount("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="necessity">Necessity</option>
          <option value="desire">Desire</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
