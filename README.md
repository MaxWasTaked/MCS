# Minecraft Server Control (MCS)

Welcome to the Minecraft Server Control (MCS) project! This guide will walk you through everything you need to know about how to use and set up your Minecraft server from the comfort of your home. With MCS, you can easily manage and control your Minecraft server using a simple and intuitive interface.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Usage Guide](#usage-guide)
5. [Technical Details](#technical-details)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

Minecraft Server Control (MCS) is designed to simplify the process of hosting a Minecraft server at home. With MCS, you can start, stop, and manage your Minecraft server with ease. The application uses Electron for the user interface and Node.js for server management, providing a seamless experience.

## Features

- **Start and Stop Server**: Easily start and stop your Minecraft server with the click of a button.
- **Plugin Management**: Open the plugins folder to add or remove plugins without hassle.
- **Server Settings**: Access and modify the server properties directly from the application.
- **Real-time Console Output**: View the live console output from the server for monitoring and debugging.
- **Command Input**: Send commands to the server directly from the application.

## Setup Instructions

Follow these steps to set up your MCS application:

1. **Clone the Repository**:
   ```bash

   git clone https://github.com/yourusername/minecraft-server-control.git
   cd minecraft-server-control

2. **Install Dependencies**:
   ```bash

   npm install

3. **Run the Application**:
   ```bash
   
   npm start

## Usage Guide

### Starting the Server

1. Open the application.
2. Click the **Start** button to initiate the server. The server version 1.20.4 will start, and you will see the console output updating in real-time.

### Stopping the Server

1. Click the **Stop** button. The server will gracefully shut down, and the console output will indicate that the server has stopped.

### Managing Plugins

1. Click the **Plugins** button to open the plugins directory.
2. Add or remove plugins as needed.
3. Restart the server to apply changes.

### Modifying Server Settings

1. Click the **Settings** button to open the `server.properties` file.
2. Modify the server properties as needed.
3. Save the file and restart the server to apply changes.

### Sending Commands

1. Enter your command in the command input box.
2. Click the **Send** button or press Enter to send the command to the server.

## Technical Details

### File Structure

- `index.html`: Main HTML file for the user interface.
- `main.js`: Main Electron process file that controls the application lifecycle.
- `renderer.js`: Renderer process file that handles the front-end logic.
- `styles.css`: CSS file for styling the application.
- `package.json`: Node.js file that manages project dependencies and scripts.

### Server Setup

The application automatically downloads the PaperMC server JAR file and sets up the server directory. It also handles the EULA acceptance and manages server processes using Node.js.

### Network Configuration

The application fetches the IPv4 address of your machine and displays it when the server starts, making it easy for others to connect to your server.

## Contributing

We welcome contributions! If you find a bug or have a feature request, please open an issue or submit a pull request. Make sure to follow our [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using Minecraft Server Control! We hope this tool makes managing your Minecraft server a breeze. Happy gaming!
