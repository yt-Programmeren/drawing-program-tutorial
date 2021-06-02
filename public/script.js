const socket = io();
let mouseDown = false;
let mouseX = 0;
let mouseY = 0;

window.onload = () => {
    socket.emit('join', ROOM_ID);
    c = document.querySelector('canvas');
    ctx = c.getContext('2d');
    addEventListener('mousedown', () => mouseDown = true);
    addEventListener('mouseup', () => mouseDown = false);
    addEventListener('mousemove', e => {
        let pmouseX = mouseX;
        let pmouseY = mouseY;
        let boundingBox = c.getBoundingClientRect();
        mouseX = e.clientX - boundingBox.x;
        mouseY = e.clientY - boundingBox.y;
        if ( mouseDown ) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(pmouseX, pmouseY);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            socket.emit('draw', {ROOM_ID, mPos: { x: mouseX, y: mouseY }, pmPos: {x: pmouseX, y: pmouseY}}); 
        }
    });
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, c.width, c.height);
}

socket.on('draw', ({ mPos, pmPos }) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(pmPos.x, pmPos.y);
    ctx.lineTo(mPos.x, mPos.y);
    ctx.stroke();

})