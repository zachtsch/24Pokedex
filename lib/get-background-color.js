const typeToColor = {
  grass: '#8bc660',
  poison: '#94469b',
  fire: '#e18544',
  flying: '#a491ea',
  water: '#708ee9',
  bug: '#abb742',
  normal: '#a8a87d',
  dark: '#6c594a',
  electric: '#f2d054',
  psychic: '#e66388',
  ground: '#dbc275',
  ice: '#a6d6d7',
  steel: '#b8b8ce',
  fairy: '#e29dac',
  fighting: '#b13e31',
  rock: '#ac9a48',
  ghost: '#6c5994',
  dragon: '#683bef',
};

const getBackgroundColor = (type) => {
  return typeToColor[type];
};

export default getBackgroundColor;
