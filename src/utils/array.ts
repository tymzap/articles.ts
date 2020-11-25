export const compare = (condition: boolean, order: 'ASC' | 'DESC', ) => {
  if (condition) {
    if (order === 'ASC') {
      return -1;
    }
    return 1;
  }
  if (order === 'DESC') {
    return -1;
  }
  return 1;
};
