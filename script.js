const pokemonNames = [
  'Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Jigglypuff', 'Meowth', 'Psyduck', 'Snorlax', 'Dragonite', 'Mewtwo', 'Chikorita',
  'Cyndaquil', 'Totodile', 'Togepi', 'Mareep', 'Typhlosion', 'Feraligatr', 'Unown', 'Wobbuffet', 'Girafarig', 'Shuckle', 'Swinub',
  'Lugia', 'Ho-Oh', 'Treecko', 'Torchic', 'Mudkip', 'Beautifly', 'Mightyena', 'Wurmple', 'Gardevoir', 'Exploud', 'Kyogre', 'Groudon',
  'Rayquaza', 'Turtwig', 'Chimchar', 'Piplup', 'Luxray', 'Lucario'
];

const colors = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900',
  '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', 
  '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', 
  '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', 
  '#99E6E6', '#6666FF'
];

const enterRoomButton = document.getElementById('login-btn');
if (enterRoomButton) {
  enterRoomButton.addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * pokemonNames.length);
    const randomPokemonName = pokemonNames[randomIndex];
    localStorage.setItem('userName', randomPokemonName);
    localStorage.setItem('userColor', userColor);

    const CHANNEL_ID = 'gM860Lw7cfNCaIcl';
    const userColor = colors[Math.floor(Math.random() * colors.length)];
    const drone = new ScaleDrone(CHANNEL_ID, {
      data: {
        name: randomPokemonName,
        color: userColor,
      },
    });
  });
}

function entryRoom() {  
  const userName = localStorage.getItem('userName');
  const userColor = localStorage.getItem('userColor');
  
  alert(`Welcome to the chat room! Your Pokémon name is: ${userName} and your color is: ${userColor}`);
  window.open('chatRoom.html');
}

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
const nameLeft = document.querySelector('.nameLeft');
const rightText = document.querySelector('.rightText p');
const chatInput = document.querySelector('#chat');
const sendBtn = document.querySelector('.sendBtn');

let userName = '';
let userColor = '';

if (sendBtn) {
  sendBtn.addEventListener('click', sendMessage);
}

function sendMessage() {
  // get the value of the chat input
  const message = chatInput.value;
  userName = localStorage.getItem('userName');
  userColor = localStorage.getItem('userColor');

  // create a new message element
  const newMessage = document.createElement('div');

  // set the message content based on the input value
  newMessage.innerHTML = `
  <p class="nameLeft" style="color: ${userColor};">${nameLeft.textContent} ${userName}</p>
  <div class="leftText">
    <p style="color: ${userColor};">${message}</p>
  </div>
`;

  // insert the new message at the top of the mainWraper div
  mainWraper.insertAdjacentElement('afterbegin', newMessage);

  // clear the chat input
  chatInput.value = '';

  // send the message to the chat room
  const droneChannel = 'observable-' + CHANNEL_ID;
  drone.publish({
    room: 'chat-room',
    message: {
      user: nameLeft.textContent,
      message: message
    }
  });
}

// Listen for incoming messages on chat room channel
const roomChannel = drone.subscribe('chat-room');

roomChannel.on('open', error => {
  if (error) {
    console.error(error);
    return;
  }

  roomChannel.on('data', (data) => {
    console.log('Received message:', data);
    // Display message in chat room UI
    const newMessage = document.createElement('div');
    newMessage.innerHTML = `
      <p class="nameRight" style="color: ${data.userColor};">${nameRight.textContent} ${data.user}</p>
      <div class="rightText">
        <p style="color: ${data.userColor};">${data.message}</p>
      </div>`;
    mainWraper.insertAdjacentElement('afterbegin', newMessage);
  });
});
// send the message to the chat room
const droneChannel = 'observable-' + CHANNEL_ID;
drone.publish({
  room: 'chat-room',
  message: {
    user: nameRight.textContent,
    message: message
  }
});
