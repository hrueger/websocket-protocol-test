import * as WebSocket from "ws";

enum Commands {
    ENUMERATE = "ENUMERATE",
    ENUMERATION = "ENUMERATION",
    CONTROL_CHANGE = "CONTROL_CHANGE",
}

const socket = new WebSocket('ws://localhost:12800');
socket.on('open', () => {
    socket.send(JSON.stringify({
        command: Commands.ENUMERATE,
    }));
});

let counter = 0;

socket.on('message', (data) => {
    const message = JSON.parse(data.toString());
    console.dir(message, { depth: null });
    
    if (message.groupIndex == 1 && message.controlIndex == 2) {
        counter += 50;
        socket.send(JSON.stringify({
            command: Commands.CONTROL_CHANGE,
            controlName: 'absolute fader',
            groupName: 'faders',
            value: counter,
        }));
    }
});
