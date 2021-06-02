const electron = require("electron");
const ipc = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const join = path.join;
const isDev = require("electron-is-dev");

const { spawn } = require("child_process");

// LCU
let mainWindow;

var createWindow = () => {
  // Agrego extensiones
  if (isDev) {
    addExtensions();
  }

  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    icon: "",
    webPreferences: {
      nodeIntegration: true,
    },
    // frame: false,
    // resizable: false,
    // transparent: true,
  });

  // mainWindow.setMenuBarVisibility(false);

  // Inicio react
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "./build/index.html")}`
  );

  // Abro herramientas de desarrollo
  mainWindow.webContents.openDevTools();

  // Cierro programa al cerrar ventana
  mainWindow.on("closed", () => (mainWindow = null));
};

const myShellScript = spawn(
  "cd .\\face_recognition_module && .\\main.exe",
  null,
  { shell: true }
);

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  myShellScript.stdin.pause();
  myShellScript.kill();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Extensiones para desarrollo
const addExtensions = () => {
  var extension_path = join(
    process.env.APPDATA.replace(process.env.APPDATA.split(path.sep).pop(), ""),
    "Local",
    "Google",
    "Chrome",
    "User Data",
    "Default",
    "Extensions"
  );
  var react_dev_tools = "fmkadmapgofadopljbjfkapdkoienihi";
  var redux_dev_tools = "lmhkpmbekcpmknklioeibfkpmmfibljd";

  const isDirectory = (source) => lstatSync(source).isDirectory();
  const getDirectories = (source) =>
    readdirSync(source)
      .map((name) => join(source, name))
      .filter(isDirectory);

  // var direc

  try {
    BrowserWindow.addDevToolsExtension(
      getDirectories(`${path.join(extension_path, react_dev_tools)}`)[0]
    );
    BrowserWindow.addDevToolsExtension(
      getDirectories(`${path.join(extension_path, redux_dev_tools)}`)[0]
    );
  } catch {
    console.log("No extensions");
  }
};
