import styled from "styled-components";

const BalanceWrapper = styled.p`
  color: ${(props) => (props.balance < 0 ? "red" : "green")};
  font-size: 1.5rem;
`;

const Balance = ({ expense, income }) => {
  const expenses = [];
  const incomes = [];

  expense.forEach((element) => {
    expenses.push(Number(element[2]));
  });
  income.forEach((element) => {
    incomes.push(Number(element[2]));
  });

  const initialValue = 0;
  const expenseAmount = expenses.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  const incomeAmount = incomes.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  const balance = (incomeAmount - expenseAmount).toFixed(2);

  return <BalanceWrapper balance={balance}>${balance}</BalanceWrapper>;
};

export default Balance;
