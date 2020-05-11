'use strict';

/* ========== PŘIJÍMÁNÍ ZPRÁV ========== */

const messagesElement = document.querySelector('#messages');

const renderMessage = (name, message, date) => {
  // @TODO: funkce vracející HTML zprávy
  const messageElm = document.createElement('div')
  messageElm.className = "card-body"
  messageElm.innerHTML = `
    <div class="card mt-3 mb-3">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
          <small class="text-muted">${date}</small>
        <p class="card-text">${message}</p>
      </div>
    </div>`
  return messageElm
};

const renderMessages = (messages) => {
  // @TODO: funkce vypisující zprávy na stránku
  messagesElement.innerHTML = '';
  for (let i = 0; i < messages.length; i += 1) {
    const messageElm = renderMessage(messages[i].name, messages[i].message, messages[i].date);
    messagesElement.appendChild(messageElm);
  }
};

renderMessages([
  { name: 'Pavel', message: 'Ahoj 👋', date: '11. 5. 2020 17:30:00' },
  { name: 'Martina', message: 'Ja se máte?', date: '11. 5. 2020 17:29:54' },
  { name: 'Michal', message: 'Nazdar', date: '12. 5. 2020 12:17:21' },
  { name: 'Ivana', message: 'Ahoj', date: '12. 5. 2020 11:02:15' },
])

const updateMessages = () => {
  // @TODO: funkce stahující zprávy ze server a přidávající je na stránku
  fetch('https://czechichat.herokuapp.com/api/list-messages')
    .then(response => response.json())
    .then(data => renderMessages(data.messages))
};

setInterval(updateMessages, 2000); // Každé dvě sekundy zavolá updateMessages

/* ========== ODESÍLÁNÍ ZPRÁV ========== */

const nameInputElement = document.querySelector('#name-input');
const messageInputElement = document.querySelector('#message-input');

const onSubmit = (event) => {
  event.preventDefault(); // Zamezí přesměrování na jinou stránku při odesílání formuláře

  console.log(
    'Data:',
    JSON.stringify({
      name: nameInputElement.value,
      message: messageInputElement.value,
    }),
  );

  // @TODO: odešli zprávu na server
  fetch('https://czechichat.herokuapp.com/api/send-message', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInputElement.value,
      message: messageInputElement.value,
    })
  })
  nameInputElement.value = '';
  messageInputElement.value = '';
};

document.querySelector('#send-form').addEventListener('submit', onSubmit);
