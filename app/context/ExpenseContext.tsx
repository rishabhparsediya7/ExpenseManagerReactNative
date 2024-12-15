import React, { createContext, useState, useContext, ReactNode } from "react";

interface ExpenseContextType {
  expenseCount: number;
  addExpense: () => void;
}

const defaultExpenseContextValue: ExpenseContextType = {
  expenseCount: 0,
  addExpense: () => null,
};

const ExpenseContext = createContext<ExpenseContextType>(
  defaultExpenseContextValue
);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expenseCount, setExpenseCount] = useState(0);

  return (
    <ExpenseContext.Provider
      value={{
        addExpense: () => {
          console.log("updating the expense...");
          setExpenseCount((prev) => prev + 1);
        },
        expenseCount,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
