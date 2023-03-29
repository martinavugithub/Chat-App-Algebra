// Scaledrone channel ID
const CHANNEL_ID = 'gM860Lw7cfNCaIcl';
const ROOM_NAME = 'lobby';

/* UI */
const scaleDroneStatusLabel = document.getElementById('scaledroneStatus');
const sendButton = document.getElementById('sendBtn');
const chatInput = document.getElementById('chatInput');
const messages = document.getElementById('messages');

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

/* SCALEDRONE */

// Connect to Scaledrone
const drone = new ScaleDrone(CHANNEL_ID, {
  data: { // Will be sent out as clientData via events
    name: 'Martina',
    color: 'red',
  },
 });

// Wait for Scaledrone connection to be established
drone.on('open', error => {
  if (error) {
    console.error(error);
    return;
  }
  scaleDroneStatusLabel.textContent = 'Open'
});

drone.on('reconnect', () => {
  scaleDroneStatusLabel.textContent = 'Reconnect'
});

drone.on('error', error => {
  scaleDroneStatusLabel.textContent = `Error: ${error}`
});

/* SCALEDRONE ROOM */

const room = drone.subscribe(ROOM_NAME);

room.on('open', error => {
  if (error) {
    return console.error(error);
  }
  scaleDroneStatusLabel.textContent = `Connected: ${ROOM_NAME}`;
});

room.on('message', message => {
  const {data, id, timestamp, clientId, member} = message;
  // TODO:
  // messages.addElement(<p>data</p>)
  // add p elements to messages DOM
});

sendButton.addEventListener('click', e => {
  e.preventDefault();

  if (!chatInput.value) {
    return;
  }

  drone.publish({
    room: ROOM_NAME,
    message: chatInput.value
  });
})
