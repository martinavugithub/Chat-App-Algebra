const loginForm = document.querySelector('#login-form');
const loginButton = document.querySelector('#login-btn');

loginButton.addEventListener('click', event => {
  event.preventDefault();
  handleLogin();
});

function handleLogin() {
    // get the username entered by the user
    const usernameInput = document.querySelector('#username');
    const username = usernameInput.value;
  
    // connect to Scaledrone using the user's username as the client ID
    const drone = new ScaleDrone('gM860Lw7cfNCaIcl', {
      data: { username },
    });
  
    drone.on('open', error => {
      if (error) {
        console.error(error);
      } else {
        console.log('Connected to Scaledrone');
  
        // create a new room for the user to join
        const roomName = 'lobby';
        const room = drone.subscribe(roomName);
  
        // redirect the user to the chat room with the username and room name as query parameters
        const queryParams = `?username=${username}&room=${roomName}`;
        window.location.href = `./chatRoom.html${queryParams}`;
      }
    });
  }


  const queryParams = new URLSearchParams(window.location.search);
const username = queryParams.get('username');
const roomName = queryParams.get('room');

const drone = new ScaleDrone('gM860Lw7cfNCaIcl', {
  data: { username },
});

drone.on('open', error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Connected to Scaledrone');

    const room = drone.subscribe(roomName);
    const chatInput = document.querySelector('#chat');
    const sendButton = document.querySelector('.sendBtn');

    sendButton.addEventListener('click', event => {
      event.preventDefault();
      const message = chatInput.value;
      drone.publish({
        room: roomName,
        message: { username, message },
      });
      chatInput.value = '';
    });

    room.on('data', data => {
      const { message, username: authorName } = data;
      const chatBox = document.querySelector('.mainWraper');
      const div = document.createElement('div');
      const p1 = document.createElement('p');
      const p2 = document.createElement('p');
      const messageNode = document.createTextNode(message);
      const authorNode = document.createTextNode(authorName);
      const date = new Date();
      const time = `${date.getHours()}:${date.getMinutes()}`;
      const timeNode = document.createTextNode(time);

      div.className = username === authorName ? 'right' : 'left';
      p1.className = 'name';
      p2.className = 'text';

      p1.appendChild(authorNode);
      p2.appendChild(messageNode);
      div.appendChild(p1);
      div.appendChild(p2);
      chatBox.appendChild(div);

      const chatText = document.querySelector('.chatText');
      chatText.scrollTop = chatText.scrollHeight;
    });
  }
});