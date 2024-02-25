const getPokeIDFromUrl = (url) => {
  const urlSegments = url.split('/');
  const pokeID = urlSegments.pop() || urlSegments.pop();
  return pokeID;
};

const getEvoData = async (url) => {
  const evos = [];
  const evoResponse = await fetch(url);
  const evoData = await evoResponse.json();

  const traverseChain = (node, level) => {
    if (evos[level] == undefined) evos[level] = [];
    evos[level].push(getPokeIDFromUrl(node.species.url));
    node.evolves_to, forEach((child) => traverseChain(child, level + 1));
  };

  traverseChain(evoData.chain, 0);

  return evos;
};

export { getEvoData };
