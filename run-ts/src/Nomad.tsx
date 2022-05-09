import React from 'react';

function Nomad() {
  type Player = { name: string; age?: number };

  const player: {
    name: string;
    age?: number;
  } = {
    name: 'bang',
  };

  const playerNico: Player = {
    name: 'nico',
  };


  


  if (player.age && player.age < 10) {
  }
  console.log(player);
  return <div></div>;
}

export default Nomad;
