// Updated App.jsx
import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [initialBalance, setInitialBalance] = useState(() => {
    return parseFloat(localStorage.getItem("initialBalance")) || 0;
  });
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("initialBalance", initialBalance);
  }, [expenses, initialBalance]);

  const addExpense = (expense) => {
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remainingBalance = initialBalance - totalSpent;

    if (expense.amount > remainingBalance) {
      alert("Expense amount exceeds the remaining balance!");
      return;
    }

    // Assign a unique id to each expense
    const newExpense = { ...expense, id: Date.now() }; 
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = initialBalance - totalSpent;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Money Tracker</h1>
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-lg mb-4">
  <label className="block text-gray-700 mb-2">Set Initial Balance:</label>
  <input
    type="number"
    value={initialBalance === 0 ? "" : initialBalance} // Show empty input if balance is 0
    onChange={(e) => {
      const value = e.target.value;
      const parsedValue = parseFloat(value);
      setInitialBalance(isNaN(parsedValue) ? 0 : parsedValue); // Remove leading zeros
    }}
    className="w-full p-2 border rounded-lg mb-4"
  />
  <p className="text-lg">
    <span className="font-bold">Balance Remaining:</span> ₹{balance}
  </p>
</div>

      <ExpenseForm onAddExpense={addExpense} />
      <div className="flex flex-wrap gap-4 mt-6 w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Necessities</h2>
          <ul className="space-y-2">
            {expenses
              .filter((expense) => expense.category === "necessity")
              .map((expense) => (
                <li
                  key={expense.id}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
                >
                  <span>
                    {expense.description} - ₹{expense.amount}
                  </span>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Desires</h2>
          <ul className="space-y-2">
            {expenses
              .filter((expense) => expense.category === "desire")
              .map((expense) => (
                <li
                  key={expense.id}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
                >
                  <span>
                    {expense.description} - ₹{expense.amount}
                  </span>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 w-full max-w-2xl">
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  );
}

export default App;
