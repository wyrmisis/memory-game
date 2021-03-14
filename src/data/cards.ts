import Card from '../types/card';

const faceDirectory = '/assets/cards';

const cards: Card[] = [
  { name: 'Sword', face: `${faceDirectory}/sword.png` },
  { name: 'Bow', face: `${faceDirectory}/bow.png` },
  { name: 'Pegasus Boots', face: `${faceDirectory}/boots.png` },
  { name: 'Power Glove', face: `${faceDirectory}/power-glove.png` },
  { name: 'Moon Pearl', face: `${faceDirectory}/moon-pearl.png` },
  { name: 'Magic Hammer', face: `${faceDirectory}/hammer.png` },
  { name: 'Hookshot', face: `${faceDirectory}/hookshot.png` },
  { name: 'Fire Rod', face: `${faceDirectory}/fire-rod.png` },
  { name: 'Zora Flippers', face: `${faceDirectory}/flippers.png` },
  { name: 'Cane of Somaria', face: `${faceDirectory}/cane.png` },
  { name: 'Flute', face: `${faceDirectory}/flute.png` },
  { name: 'Magic Mirror', face: `${faceDirectory}/mirror.png` }
];

export default cards;
