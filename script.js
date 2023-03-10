const pics = [
  { name: 'bulbasaur', image: './images/bulbasaur.png' },
  { name: 'chansey', image: './images/chansey.png' },
  { name: 'charmander', image: './images/charmander.png' },
  { name: 'diglett', image: './images/diglett.png' },
  { name: 'gengar', image: './images/gengar.png' },
  { name: 'meowth', image: './images/meowth.png' },
  { name: 'pikachu', image: './images/pikachu.png' },
  { name: 'squirtle', image: './images/squirtle.png' },
];

const picsTwice = [...pics, ...pics];

let i = 0;

for (i = 0; i < 16; i++) {
  let index = Math.floor(Math.random() * (16 - i)); // generates an index => (16-i) is number of elements left in the array since 1 element is removed at each iteration
  document.getElementById('gamebox').innerHTML += `
  <div class="card-container">
  <div class="card card-before">?</div>
  <div class="card card-after"><img src= "${picsTwice[index].image}" class="card-image" /></div>
  </div>`;
  picsTwice.splice(index, 1); //the used pic gets removed
}
