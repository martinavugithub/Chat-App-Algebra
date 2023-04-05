/* Scaledrone channel ID */
const CHANNEL_ID = 'gM860Lw7cfNCaIcl';
const ROOM_NAME = 'Algebra';


/* UI */
const scaleDroneStatusLabel = document.getElementById('scaledroneStatus');
const sendButton = document.getElementById('sendBtn');
const chatInput = document.getElementById('chatInput');
const messages = document.getElementById('messages');

const members = {};

let drone = null;
let clientName = '';

/* Generate a random color for the user */
const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};

/* Generate a random Pokemon name for the user */
const randomPokemon = () => {
  const pokemonNames = [
    'Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Jigglypuff', 'Meowth', 'Psyduck', 'Snorlax', 'Dragonite', 'Mewtwo', 'Chikorita',
    'Cyndaquil', 'Totodile', 'Togepi', 'Mareep', 'Typhlosion', 'Feraligatr', 'Unown', 'Wobbuffet', 'Girafarig', 'Shuckle', 'Swinub',
    'Lugia', 'Ho-Oh', 'Treecko', 'Torchic', 'Mudkip', 'Beautifly', 'Mightyena', 'Wurmple', 'Gardevoir', 'Exploud', 'Kyogre', 'Groudon',
    'Rayquaza', 'Turtwig', 'Chimchar', 'Piplup', 'Luxray', 'Lucario'
  ];
  return pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
};

/* Define drone clientData here */
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

/* Wait for Scaledrone connection to be established */
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
  scaleDroneStatusLabel.textContent = `Connected: ${ROOM_NAME} 🟢`;
  console.log(`Room ${ROOM_NAME} is now open`);
});

room.on('member_join', member => {
  members[member.id] = member.clientData;
  if (member.clientData) {
    scaleDroneStatusLabel.textContent =`${member.clientData.name} joined the room`;
  } else {
    console.log(`A new member joined the room`);
  }
});

document.getElementById('pokemonName').textContent = clientName;
document.getElementById('pokemonName').style.color = clientColor;

/* MESSAGES */
room.on('message', message => {
  const { content, name, color } = message.data;
  const newMessage = document.createElement('p');
  newMessage.innerHTML = `<span style="color: ${color};">${name}: </span><span style="color: ${color};">${content}</span>`;
  messages.appendChild(newMessage);

  if (name == clientName) { // da li je poruka od mene?
    newMessage.classList.add("rightText"); // dodaj klasu za desno
  } else {
    newMessage.classList.add("leftText"); // dodaj klasu za lijevo
  }
  
});


function handleSendMessage(e) {
  e.preventDefault();

  if (!chatInput.value) {
    alert('Error: Chat input is empty');
    return;
  }
  if (chatInput.value && chatInput.value.length > 100) {
    alert('Your message is too long!');
    return;
  }

  console.log('Sending message:', chatInput.value);

  const message = {
    content: chatInput.value,
    name: clientName,
    color: clientColor,
  };

  drone.publish({
    room: ROOM_NAME,
    message
  });

  chatInput.value = '';
}

sendButton.addEventListener('click', handleSendMessage);

chatInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    handleSendMessage(event);
  }
});
