import { Fragment, useState, useEffect } from "react";

import AddForm from "../components/AddForm/AddForm";
import Expense from "../components/Expense/Expense";
import Income from "../components/Income/Income";
import ListExpense from "../components/ListExpense/ListExpense";
import ListIncome from "../components/ListIncome/ListIncome";
import RemoveButton from "../components/RemoveButton/RemoveButton";
import Balance from "../components/Balance/Balance";
import {
  exampleExpense1,
  exampleExpense2,
  exampleExpense3,
  exampleIncome1,
  exampleIncome2,
  exampleIncome3,
} from "../helpers/initialData";

const Calculator = () => {
  const expenseStorage = JSON.parse(localStorage.getItem("expenseStorage"));
  const incomeStorage = JSON.parse(localStorage.getItem("incomeStorage"));

  const [expense, setExpense] = useState(
    expenseStorage === null
      ? [exampleExpense1, exampleExpense2, exampleExpense3]
      : expenseStorage
  );
  const [income, setIncome] = useState(
    incomeStorage === null
      ? [exampleIncome1, exampleIncome2, exampleIncome3]
      : incomeStorage
  );

  const transformData = (data) => {
    if (data.type === "Expense") {
      setExpense([
        ...expense,
        [data.id, data.name, data.amount, data.category],
      ]);
    }
    if (data.type === "Income") {
      setIncome([...income, [data.id, data.name, data.amount, data.category]]);
    }
  };

  const removeExpenseItem = (index) => {
    setExpense((expense) => expense.filter((_, i) => i !== index));
  };
  const removeIncomeItem = (index) => {
    setIncome((income) => income.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem("expenseStorage", JSON.stringify(expense));
  }, [expense]);
  useEffect(() => {
    localStorage.setItem("incomeStorage", JSON.stringify(income));
  }, [income]);

  return (
    <Fragment>
      <div className="balance-container">
        <h2>Your balance is:</h2>
        <Balance expense={expense} income={income} />
      </div>
      <div className="flex-container">
        <div>
          <AddForm passData={transformData} />
        </div>
        <div>
          <h2>Expenses:</h2>
          <Expense>
            {expense &&
              expense.map((element, index) => {
                return (
                  <Fragment key={`${element[0]}`}>
                    <ListExpense>
                      {element[1]}, ${element[2]}, {element[3]}
                    </ListExpense>
                    <RemoveButton index={index} remove={removeExpenseItem} />
                  </Fragment>
                );
              })}
          </Expense>
        </div>
        <div>
          <h2>Incomes:</h2>
          <Income>
            {income &&
              income.map((element, index) => {
                return (
                  <Fragment key={`${element[0]}`}>
                    <ListIncome>
                      {element[1]}, ${element[2]}, {element[3]}
                    </ListIncome>
                    <RemoveButton index={index} remove={removeIncomeItem} />
                  </Fragment>
                );
              })}
          </Income>
        </div>
      </div>
    </Fragment>
  );
};

export default Calculator;
