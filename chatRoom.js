/* Scaledrone channel ID */
const CHANNEL_ID = 'gM860Lw7cfNCaIcl';
const ROOM_NAME = 'observable-algebra';


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
const pokemonNames = [
  'Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Jigglypuff', 'Meowth', 'Psyduck', 'Snorlax', 'Dragonite', 'Mewtwo', 'Chikorita',
  'Cyndaquil', 'Totodile', 'Togepi', 'Mareep', 'Typhlosion', 'Feraligatr', 'Unown', 'Wobbuffet', 'Girafarig', 'Shuckle', 'Swinub',
  'Lugia', 'Ho-Oh', 'Treecko', 'Torchic', 'Mudkip', 'Beautifly', 'Mightyena', 'Wurmple', 'Gardevoir', 'Exploud', 'Kyogre', 'Groudon',
  'Rayquaza', 'Turtwig', 'Chimchar', 'Piplup', 'Luxray', 'Lucario'
];

const randomPokemon = () => {
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

/* Wait for Scaledrone connection to be established */
drone.on('open', function() {
  console.log('Connected to drone.');

drone.on('error', function(error) {
  alert('Error connecting to drone: ' + error.message);
  console.error('Error connecting to drone:', error);
});

  scaleDroneStatusLabel.textContent = 'Open'
});

drone.on('reconnect', () => {
  scaleDroneStatusLabel.textContent = 'Reconnect'
});

drone.on('error', error => {
  scaleDroneStatusLabel.textContent = `Error: ${error}`
});

/* SCALEDRONE ROOM */

const room = drone.subscribe(`${ROOM_NAME}`);

room.on('open', error => {
  if (error) {
    scaleDroneStatusLabel.textContent = `Error: Could not connect to room 🔴`
    return console.error(error);
  }
  scaleDroneStatusLabel.textContent = `Connected: ${ROOM_NAME} 🟢`;
 
});

room.on('members', m => {
  m.forEach(member => {
    members[member.clientData.id] = member;
  });
});

room.on('member_join', member => {
  members[member.id] = member.clientData;
  if (member.clientData) {
    scaleDroneStatusLabel.textContent =`${member.clientData.name} joined the room`;
    Toastify({ text: `${member.clientData.name} joined the room` }).showToast();
  } else {
    console.log(`A new member joined the room`);
  }
});

room.on('member_leave', (member) => {
  member = members[member.id];
  if (member) {
    delete members[member.id];
    Toastify({ text: `${member.name} left the room` }).showToast();
    
  }
 });

document.getElementById('pokemonName').textContent = clientName;
document.getElementById('pokemonName').style.color = clientColor;

const timeElement = document.getElementById('timestamp');
const message = document.getElementById('messages');

room.on('message', message => {
  const { content, name, color } = message.data;
  const newMessageContainer = document.createElement('div'); // novi kontejner za poruku i vrijeme
  const newMessage = document.createElement('p'); // novi element za poruku
  const timestamp = new Date().toLocaleTimeString(); // dohvaćanje vremena

  // dodavanje novog elementa za prikaz vremena
  const timestampElement = document.createElement('span');
  timestampElement.textContent = timestamp;
  timestampElement.classList.add("timestamp"); // dodavanje klase za CSS stiliziranje
  newMessageContainer.appendChild(timestampElement);

  // dodavanje teksta poruke
  const messageContent = document.createElement('span');
  messageContent.innerHTML = `<span style="color: ${color};">${name}: </span><span style="color: ${color};">${content}</span>`;
  newMessage.appendChild(messageContent);
  newMessageContainer.appendChild(newMessage);

  messages.appendChild(newMessageContainer);

  if (name == clientName) { // da li je poruka od mene?
    newMessageContainer.classList.add("rightText"); // dodaj klasu za desno
  } else {
    newMessageContainer.classList.add("leftText"); // dodaj klasu za lijevo
  }
});

function handleSendMessage(e) {
  e.preventDefault();

  if (!chatInput.value.trim()) {
    alert('Error: Chat input is empty');
    return;
  }
  if (chatInput.value && chatInput.value.length > 100) {
    alert('Your message is too long!');
    return;
  }


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