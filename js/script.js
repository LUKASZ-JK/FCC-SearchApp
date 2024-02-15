'use strict';

const userInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results-div')
const overviewDiv = resultsDiv.querySelector('#overview');
const imageDiv = overviewDiv.querySelector('#image');
const typesDiv = overviewDiv.querySelector('#types');

const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const searchBtn = document.getElementById('search-button');

searchBtn.addEventListener('click', getPokemon);

class Pokemon {
   constructor(data) {
      const { name, id, weight, height, types, stats, sprites } = data;
      this.name = name.replace('-f', '♀').replace('-m', '♂');
      this.id = id;
      this.weight = weight;
      this.height = height;
      this.sprite = sprites.front_default;
      this.types = []
      types.forEach(el => {
         this.types.push(el.type.name);
      })
      stats.forEach(el => {
         const { base_stat, stat } = el;
         this[stat.name] = base_stat;
      });
   }
}

function clearForm() {
   while (imageDiv.firstChild) {
      imageDiv.removeChild(imageDiv.firstChild);
   }
   while (typesDiv.firstChild) {
      const typesChildren = Array.from(typesDiv.children);
      typesChildren.forEach(child => typesDiv.removeChild(child));
   }
}

function displayOverview(pokemon) {
   pokemonName.innerText = pokemon.name;
   pokemonID.innerText = `#${pokemon.id}`;
   const image = document.createElement('img');
   image.setAttribute('id', 'sprite');
   image.setAttribute('src', pokemon.sprite);
   image.setAttribute('alt', `Front sprite of ${pokemon.name}`);
   imageDiv.appendChild(image);
   const fragment = new DocumentFragment()
   pokemon.types.forEach(type => {
      const el = document.createElement('span');
      el.innerText = type;
      el.classList.add('type');
      el.classList.add(type);
      fragment.appendChild(el);
   })
   types.appendChild(fragment);
}

function displayStats(pokemon) {
   height.innerText = pokemon.height;
   weight.innerText = pokemon.weight;
   hp.innerText = pokemon.hp;
   attack.innerText = pokemon.attack;
   defense.innerText = pokemon.defense;
   specialAttack.innerText = pokemon['special-attack'];
   specialDefense.innerText = pokemon['special-defense'];
   speed.innerText = pokemon.speed;
}

async function getPokemon(e) {
   e.preventDefault();
   clearForm();
   const userInputText = userInput.value.toLowerCase();
   try {
      const response = await fetch(
         `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${userInputText}`
      );
      const data = await response.json();
      const pokemon = new Pokemon(data)
      resultsDiv.classList.remove('hidden');
      displayOverview(pokemon);
      displayStats(pokemon);
      userInput.value = '';
   }
   catch (err) {
      resultsDiv.classList.add('hidden');
      alert('Pokémon not found');
      console.log(err);
   }
};

