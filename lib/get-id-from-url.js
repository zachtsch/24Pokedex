const getIdFromUrl = (url) => {
  return url.slice(0, -1).split('/').pop();
};

export default getIdFromUrl;
