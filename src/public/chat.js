const socket = io();

const chatBox = document.getElementById("chatBox");

socket.emit("get-message-history");

chatBox.addEventListener('keyup', event=> {
    if(event.key ==="Enter" && chatBox.value.trim().length > 0) {
        socket.emit("message", {
            user: document.getElementById("userId").value,
            message: chatBox.value
        })
    }
})

socket.on("message-history", ({messages}) => {
  document.getElementById("chat").innerHTML = messages.map(m => {
    return `<li>
      <span style="color: gray">${m.user}</span>
      <span>${m.message}</span>
    </li>`
  }).join("")
});

