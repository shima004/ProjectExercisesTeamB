const socket = new WebSocket('ws://localhost:8080/ws');

socket.onopen = function (event) {
  console.log('open');

  // send json message
  socket.send(JSON.stringify({ command: 'test', data: 'test2' }));
}

socket.onmessage = function (event) {
  console.log('message');
  console.log(event.data);
}

socket.onclose = function (event) {
  console.log('close');
}

socket.onerror = function (event) {
  console.log('error');
}


