const getEvoData = async (url) => {
  const evos = [];
  const evoResponse = await fetch(url);
  const evoData = await evoResponse.json();

  const evoURL1 = evoData.chain.species.url;
  const evoURL2 = evoData.chain.evolves_to[0].species.url;
  const evoURL3 = evoData.chain.evolves_to[0].evolves_to[0].species.url;

  const sp1Response = await fetch(evoURL1);
  const sp1Data = await sp1Response.json();
  evos.push(sp1Data.id)

  const sp2Response = await fetch(evoURL2);
  const sp2Data = await sp2Response.json();
  evos.push(sp2Data.id)

  const sp3Response = await fetch(evoURL3);
  const sp3Data = await sp3Response.json();
  evos.push(sp3Data.id)


  return evos;
};

export { getEvoData };
