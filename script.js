// Scaledrone channel ID
const CHANNEL_ID = 'gM860Lw7cfNCaIcl';

// Connect to Scaledrone
const drone = new ScaleDrone(CHANNEL_ID);

// Generate a random color for the user
const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};

// Generate a random Pokemon name for the user
const randomPokemon = () => {
  const pokemonNames = [
    'Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Jigglypuff', 'Meowth', 'Psyduck', 'Snorlax', 'Dragonite', 'Mewtwo', 'Chikorita',
    'Cyndaquil', 'Totodile', 'Togepi', 'Mareep', 'Typhlosion', 'Feraligatr', 'Unown', 'Wobbuffet', 'Girafarig', 'Shuckle', 'Swinub',
    'Lugia', 'Ho-Oh', 'Treecko', 'Torchic', 'Mudkip', 'Beautifly', 'Mightyena', 'Wurmple', 'Gardevoir', 'Exploud', 'Kyogre', 'Groudon',
    'Rayquaza', 'Turtwig', 'Chimchar', 'Piplup', 'Luxray', 'Lucario'
  ];
  return pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
};

// Wait for Scaledrone connection to be established
drone.on('open', error => {
  if (error) {
    console.error(error);
    return;
  }

  console.log('Connected to Scaledrone');

  // Hide the chat from the lobby
  const mainWraper = document.querySelector('.mainWraper');
  mainWraper.style.display = 'none';

  // Hide the chat input and send button
  const chatInput = document.querySelector('#chat');
  const sendButton = document.querySelector('.sendBtn');
  chatInput.style.display = 'none';
  sendButton.style.display = 'none';

  // Create a new room for the user to join
  const roomName = 'chat-room';
  const roomChannel = drone.subscribe(roomName);

  // Generate a random color and Pokemon name for the user
  const userColor = randomColor();
  const username = randomPokemon();

  // Select the login form elements
  const loginForm = document.querySelector('#login-form');
  const loginButton = document.querySelector('#login-btn');
  const pokemonName = document.querySelector('#pokemon-name');

// Add event listener to the login form
  loginForm.addEventListener('submit', event => {
  event.preventDefault();

  // Hide the lobby part
  const lobby = document.querySelector('.login-form');
  lobby.style.display = 'none';

  // Show the chat interface
  const chat = document.querySelector('.mainWraper');
  chat.style.display = 'flex';
  chatInput.style.display = 'block';
  sendButton.style.display = 'block';
  });
});