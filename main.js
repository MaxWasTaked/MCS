const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const Stream = require('stream');
const { promisify } = require('util');
const pipeline = promisify(Stream.pipeline);
const os = require('os');

let mainWindow;
let minecraftProcess;

const PAPERMC_URL = 'https://api.papermc.io/v2/projects/paper/versions/1.20.4/builds/497/downloads/paper-1.20.4-497.jar';
const SERVER_DIR = path.join(__dirname, 'minecraft_server');
const JAR_PATH = path.join(SERVER_DIR, 'paper.jar');

async function downloadPaperMC() {
  const fetch = (await import('node-fetch')).default;
  if (!fs.existsSync(SERVER_DIR)) {
    fs.mkdirSync(SERVER_DIR);
  }

  const response = await fetch(PAPERMC_URL);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  await pipeline(response.body, fs.createWriteStream(JAR_PATH));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.setMenu(null);
}

function getIPv4Address() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

app.whenReady().then(async () => {
  await downloadPaperMC();

  // Automatically accept EULA
  fs.writeFileSync(path.join(SERVER_DIR, 'eula.txt'), 'eula=true\n');

  createWindow();
});

app.on('window-all-closed', () => {
  if (minecraftProcess && !minecraftProcess.killed) {
    minecraftProcess.kill('SIGTERM');
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('start-server', (event) => {
  if (!minecraftProcess) {
    minecraftProcess = spawn('java', ['-Xmx1024M', '-Xms1024M', '-jar', JAR_PATH, 'nogui'], {
      cwd: SERVER_DIR
    });

    minecraftProcess.stdout.on('data', (data) => {
      mainWindow.webContents.send('console-output', data.toString());
    });

    minecraftProcess.stderr.on('data', (data) => {
      mainWindow.webContents.send('console-output', data.toString());
    });

    minecraftProcess.on('exit', () => {
      mainWindow.webContents.send('server-stopped');
      minecraftProcess = null;
    });

    // Send IPv4 address to renderer
    mainWindow.webContents.send('server-started', getIPv4Address());
  }
});

ipcMain.on('stop-server', () => {
  if (minecraftProcess) {
    minecraftProcess.stdin.write('stop\n');
  }
});

ipcMain.on('send-command', (event, command) => {
  if (minecraftProcess) {
    minecraftProcess.stdin.write(command + '\n');
  }
});

ipcMain.on('open-plugins', async () => {
  const pluginsPath = path.join(__dirname, 'minecraft_server', 'plugins');
  await shell.openPath(pluginsPath);
});

ipcMain.on('open-server-properties', async () => {
  const propertiesPath = path.join(__dirname, 'minecraft_server', 'server.properties');
  await shell.openPath(propertiesPath);
});
