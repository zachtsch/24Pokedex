import getIdFromUrl from "../lib/get-id-from-url";

const getEvoData = async (url) => {
  const evos = [[],[],[]];
  const fEvos = [];
  const evoResponse = await fetch(url);
  const evoData = await evoResponse.json();

  const traverseEvoTree = (node, level) => {
    if (node.length < 1) {
      return null;
    };

    //Gets id from current node
    const temp = getIdFromUrl(node.species.url)
    evos[level].push(temp);

    //Recursivly move on to next child
    node.evolves_to.forEach((child) => {
      traverseEvoTree(child, level + 1);
    });
  };

  traverseEvoTree(evoData.chain, 0);

  evos.forEach((child) => {
    if (child.length != 0){
      fEvos.push(child);
    };
  });

  return fEvos;
};

export { getEvoData };
