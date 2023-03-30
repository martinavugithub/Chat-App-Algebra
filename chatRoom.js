// Scaledrone channel ID
const CHANNEL_ID = 'gM860Lw7cfNCaIcl';
const ROOM_NAME = 'lobby';


/* UI */
const scaleDroneStatusLabel = document.getElementById('scaledroneStatus');
const sendButton = document.getElementById('sendBtn');
const chatInput = document.getElementById('chatInput');
const messages = document.getElementById('messages');

const members = {};

let drone = null;
let clientName = '';

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

// Define drone clientData here
const clientData = {
  name: randomPokemon(),
  color: randomColor(),
};

/* SCALEDRONE */

drone = new ScaleDrone(CHANNEL_ID, {
  data: clientData
});

clientName = clientData.name;
clientColor = clientData.color;
console.log('My name is:', clientName, clientColor);

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

room.on('member_join', member => {
  members[member.id] = member.clientData;
  if (member.clientData) {
    console.log(`${member.clientData.name} joined the room`);
  } else {
    console.log(`A new member joined the room`);
  }
});

;
room.on('message', message => {
  const {data, clientId, member} = message;
  const {content} = data;
  const newMessage = document.createElement('p');

  console.log('Received message:', message);
  console.log('Members:', members);

  // Get the color and name of the member who sent the message
 
  const color = clientData.color;
  const name = clientData.name || clientName;

  // Set the HTML content of the <p> element
  newMessage.innerHTML = `<span style="color: ${color};">${name}: </span>${content}`;
  
  // Append the new <p> element to the "messages" div
  messages.appendChild(newMessage);
});

sendButton.addEventListener('click', e => {
  e.preventDefault();

  if (!chatInput.value) {
    console.log('Error: Chat input is empty');
    return;
  }

  console.log('Sending message:', chatInput.value);
  console.log('Client name:', clientName);
  console.log('Client data:', clientData);

  drone.publish({
    room: ROOM_NAME,
    message: {
      content: chatInput.value,
      clientName: clientName,
      color: clientData.color
    }
  });
  chatInput.value = '';
});



