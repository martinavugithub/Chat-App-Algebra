// define an array of 30 pokemon names
const pokemonNames = [
  'Bulbasaur', 'Charmander', 'Squirtle','Pikachu', 'Jigglypuff', 'Meowth', 'Psyduck', 'Snorlax', 'Dragonite', 'Mewtwo', 'Chikorita',
  'Cyndaquil', 'Totodile', 'Togepi', 'Mareep', 'Typhlosion', 'Feraligatr', 'Unown', 'Wobbuffet', 'Girafarig', 'Shuckle', 'Swinub',
  'Lugia', 'Ho-Oh', 'Treecko', 'Torchic', 'Mudkip', 'Beautifly', 'Mightyena', 'Wurmple', 'Gardevoir', 'Exploud', 'Kyogre', 'Groudon',
  'Rayquaza', 'Turtwig', 'Chimchar', 'Piplup', 'Luxray', 'Lucario'
];
const colors = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900',
  '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', 
  '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', 
  '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', 
  '#99E6E6', '#6666FF'];

const enterRoomButton = document.getElementById('login-btn');
const pokemonNameElement = document.getElementById('pokemon-name');
const userColor = colors[Math.floor(Math.random() * colors.length)];

enterRoomButton.addEventListener('click', function() {
  const randomIndex = Math.floor(Math.random() * pokemonNames.length);
  const randomPokemonName = pokemonNames[randomIndex];
  pokemonNameElement.textContent = `Your Pokémon name is: ${randomPokemonName}`;
  localStorage.setItem('userName', randomPokemonName);
  localStorage.setItem('userColor', userColor);

  const CHANNEL_ID = 'gM860Lw7cfNCaIcl';
  const drone = new ScaleDrone(CHANNEL_ID, {
    data: {
      name: randomPokemonName,
      color: userColor,
    },
  });
});

function entryRoom() {  
  const userName = localStorage.getItem('userName');
  const userColor = localStorage.getItem('userColor');
  
  alert(`Welcome to the chat room! Your Pokémon name is: ${userName}`);
  window.open('chatRoom.html');
}

// connect to Scaledrone
const CHANNEL_ID = 'gM860Lw7cfNCaIcl';
const drone = new ScaleDrone(CHANNEL_ID);

drone.on('open', error => {
  if (error) {
    console.error(error);
    return;
  }

  console.log('Connected to Scaledrone');

  // create a new room for the user to join
  const roomName = 'chat-room';
  const room = drone.subscribe(roomName);
});

// get the elements by their class name
const mainWraper = document.querySelector('.mainWraper');
const nameRight = document.querySelector('.nameRight');
const leftText = document.querySelector('.leftText p');
const name = document.querySelector('.name');
const rightText = document.querySelector('.rightText p');
const chatInput = document.querySelector('#chat');
const sendBtn = document.querySelector('.sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', sendMessage);
}

function sendMessage() {
   // get the value of the chat input
  const message = chatInput.value;

  // create a new message element
  const newMessage = document.createElement('div');

  // set the message content based on the input value
  newMessage.innerHTML = `
    <p class="nameRight">${nameRight.textContent}</p>
    <div class="leftText">
      <p>${message}</p>
    </div>
  `;

  // add the new message to the DOM
  mainWraper.appendChild(newMessage);

  // clear the chat input
  chatInput.value = '';
  alert('sendMessage() function called');
}

