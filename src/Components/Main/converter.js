const converter = (n) => {
  const a = parseInt(n);
  return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default converter;
