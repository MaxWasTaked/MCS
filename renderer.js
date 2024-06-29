const { ipcRenderer } = require('electron');
const startStopButton = document.getElementById('startStopButton');
const consoleOutput = document.getElementById('consoleOutput');
const commandBox = document.getElementById('commandBox');
const sendCommandButton = document.getElementById('sendCommandButton');
const titleElement = document.querySelector('h1');
let serverRunning = false;

function updateButton(state) {
  switch(state) {
    case 'start':
      startStopButton.textContent = 'Start';
      startStopButton.style.backgroundColor = '#4CAF50'; // Green
      startStopButton.disabled = false;
      break;
    case 'stop':
      startStopButton.textContent = 'Stop';
      startStopButton.style.backgroundColor = '#FF6347'; // Red
      startStopButton.disabled = false;
      break;
    case 'stopping':
      startStopButton.textContent = 'Stopping...';
      startStopButton.style.backgroundColor = '#777'; // Gray
      startStopButton.disabled = true;
      break;
  }
}

startStopButton.addEventListener('click', () => {
  if (!serverRunning) {
    ipcRenderer.send('start-server');
    serverRunning = true;
    updateButton('stop');
  } else {
    ipcRenderer.send('stop-server');
    updateButton('stopping');
  }
});

ipcRenderer.on('console-output', (event, data) => {
  const newLine = document.createElement('div');
  newLine.textContent = data;
  newLine.classList.add('fade-in-text');
  consoleOutput.appendChild(newLine);
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
});

ipcRenderer.on('server-stopped', () => {
  consoleOutput.innerText = '';
  serverRunning = false;
  updateButton('start');
  titleElement.textContent = 'Minecraft Server Version 1.20.4';
});

ipcRenderer.on('server-started', (event, ipAddress) => {
  titleElement.textContent = `Minecraft Server IpAddress ${ipAddress}:25565`;
});

sendCommandButton.addEventListener('click', () => {
  const command = commandBox.value;
  if (command) {
    ipcRenderer.send('send-command', command);
    commandBox.value = '';
  }
});

commandBox.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendCommandButton.click();
  }
});
