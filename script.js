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

  // Add event listener for submit event on login form
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', event => {
    event.preventDefault(); // Prevent form submission and page reload
    const chatInterface = document.getElementById('chat-interface');
    const loginForm = document.querySelector('.login-form');
    chatInterface.style.display = 'block'; // Show chat interface
    loginForm.style.display = 'none'; // Hide login form
  });
  
});


