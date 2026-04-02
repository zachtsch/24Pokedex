const padId = (id) => {
  if (id < 10) {
    return `#000${id}`;
  }
  if (id < 100) {
    return `#00${id}`;
  }
  if (id < 1000) {
    return `#0${id}`;
  }
  return `#${id}`;
};

export default padId;
