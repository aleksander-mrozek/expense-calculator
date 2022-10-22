import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styled from "styled-components";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  width: 400px;
  padding: 25px;
  line-height: 2.5;
`;
const MarginLabel = styled.label`
  margin-right: 20px;
`;

const AddForm = ({ passData }) => {
  const expenseCategories = [
    "housing",
    "transportation",
    "food",
    "utilities",
    "clothing",
    "medical",
    "other",
  ];
  const incomeCategories = [
    "salaries",
    "tips",
    "social payments",
    "rents",
    "dividends",
    "other",
  ];

  const [categoryType, setCategoryType] = useState("");

  const handleType = (e) => {
    setCategoryType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { type, name, amount, category } = e.target.elements;
    const data = {
      id: uuidv4(),
      type: type.value,
      name: name.value,
      amount: amount.value,
      category: category.value,
    };
    passData(data);
    e.target.reset();
    setCategoryType("");
  };

  let category;
  if (categoryType === "Expense") {
    category = expenseCategories.map((element) => {
      return <option key={uuidv4()}>{element}</option>;
    });
  } else if (categoryType === "Income") {
    category = incomeCategories.map((element) => {
      return <option key={uuidv4()}>{element}</option>;
    });
  } else {
    category = <option disabled></option>;
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <div>
        <input
          id="expense-radio"
          type="radio"
          name="type"
          value="Expense"
          onChange={handleType}
          required
        />
        <MarginLabel htmlFor="expense-radio">Expense</MarginLabel>
        <input
          id="income-radio"
          type="radio"
          name="type"
          value="Income"
          onChange={handleType}
          required
        />
        <label htmlFor="income-radio">Income</label>
      </div>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" name="name" required />
      <label htmlFor="amount">Amount:</label>
      <input
        id="amount"
        type="number"
        step="0.01"
        name="amount"
        min="0.01"
        required
      />
      <div>
        <MarginLabel htmlFor="category">Category:</MarginLabel>
        <select id="category" name="category">
          {category}
        </select>
      </div>
      <button type="submit">Add</button>
    </FormWrapper>
  );
};

export default AddForm;
