const socket = io();
const totalClientElement = document.getElementById("total-client");
const messageContainerElement = document.getElementById("message-container");
const nameInputElement = document.getElementById("name-input");
const messageFormElement = document.getElementById("message-form");
const messageInputElement = document.getElementById("message-input");
let currentId = "";

messageFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage(new FormData(e.target));
  messageInputElement.value = "";
});

socket.on("get-connection", (data) => {
  currentId = data;
});

socket.on("client-total", (data) => {
  totalClientElement.innerText = data;
});

socket.on("all-message", (data) => {
  displayMessage(data);
});

/**
 *
 * @param {FormData} formElement
 */
function sendMessage(formElement) {
  let message = formElement.get("message");
  if (message.length > 0) {
    const data = {
      name: nameInputElement.value || "anonymous",
      message: message,
      dateTime: new Date(),
      senderId: currentId,
    };
    socket.emit("message", data);
  }
}

/**
 *
 * @param { [{name: string, message:string, dateTime:Date,senderId:string }]} data
 */
function displayMessage(data) {
  messageContainerElement.innerHTML = "";
  for (var id = 0; id < data.length; id++) {
    const curretData = data[id];
    const liElement = document.createElement("li");
    if (curretData.senderId === currentId) {
      liElement.classList.add("message-right");
    } else {
      liElement.classList.add("message-left");
    }
    liElement.innerHTML = `
      <p class="message">
          ${curretData.message}
        <span>
            ${curretData.name} <samp>.</samp> <span>${curretData.dateTime}</span>
        </span>
      </p>
      `;
    messageContainerElement.appendChild(liElement);
  }
  // const liElement = document.createElement("li")

  //
}
