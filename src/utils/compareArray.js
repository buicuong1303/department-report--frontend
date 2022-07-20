export default (oldArray, newArray) => {
  // eslint-disable-next-line
  const listItemDelete = oldArray.filter(item => newArray.indexOf(item) === -1 );

  // eslint-disable-next-line
  const listItemAdd = newArray.filter(item =>  (oldArray.indexOf(item) === -1) );

  return {
    listItemDelete : listItemDelete,
    listItemAdd : listItemAdd
  };
};
