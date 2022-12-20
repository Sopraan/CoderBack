const socket = io();

socket.emit("dame-productos");
socket.on("productos", (productos) => {
  document.getElementById("actualizado").innerHTML = JSON.stringify(productos);
});

console.log("asdasd");
