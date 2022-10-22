const RemoveButton = ({ remove, index }) => {
  const handleClick = () => {
    remove(index);
  };

  return <button onClick={handleClick}>Remove</button>;
};

export default RemoveButton;
