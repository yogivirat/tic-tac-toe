const { app, BrowserWindow,ipcMain, dialog  } = require('electron')
let win;
let tempData;
const d = new Date();
function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 500,

    autoHideMenuBar: true,
    webPreferences : {
      nodeIntegration : true,
      contextIsolation: false},
       resizable: false
  })

  win.loadFile('render/index.html')
}


ipcMain.on("Player O Won",(event,args)=>{
  dialog.showMessageBox(
    null,
      {
        title:"Info",
        message: "Player O Won !",
        buttons: ["Play Again !!", "Quit"],
        defaultId: 0, // bound to buttons array
        cancelId: 1 // bound to buttons array
      }).then(result =>{
        if(result.response===0){
          event.sender.send("Reset");
        }
        else if (result.response === 1) {
          app.quit();
        }
      })
})
ipcMain.on("Player X Won",(event,args)=>{
  dialog.showMessageBox(
    null,
      {
        title:"Info",
        message: "Player X  Won !",
        buttons: ["Play Again !!", "Quit"],
        defaultId: 0, // bound to buttons array
        cancelId: 1 // bound to buttons array
      }).then(result =>{
        if(result.response===0){
          event.sender.send("Reset");
        }
        else if (result.response === 1) {
          app.quit();
        }
      })
})

ipcMain.on("Game Tied",()=>{
  dialog.showMessageBox(
    null,
      {
        title:"Info",
        message: "Game Tied",
        buttons: ["Play Again !!", "Quit"],
        defaultId: 0, // bound to buttons array
        cancelId: 1 // bound to buttons array
      }).then(result =>{
        if(result.response===0){
          event.sender.send("Reset");
        }
        else if (result.response === 1) {
          app.quit();
        }
      })
})
function gameRules(){
  dialog.showMessageBox(
    null,
      {
        title:"Game Rules",
        message: "The object of Tic Tac Toe is to get three in a row. You play on a three by three game board. The first player is known as X and the second is O. Players alternate placing Xs and Os on the game board until either oppent has three in a row or all nine squares are filled. X always goes first, and in the event that no one has three in a row, the stalemate is called a cat game.",
        buttons: ["Lets Play !!", "Cancel"],
        defaultId: 0, // bound to buttons array
        cancelId: 1 // bound to buttons array
      }).then(result =>{
        if(result.response === 0 ){

        }
        else if (result.response === 1) {
          app.quit();
        }
      })
}


app.whenReady().then(() => {
  createWindow()
  setTimeout(()=>{
    dialog.showMessageBox(
      null,
        {
          title:"Info",
          message: "Ready to Play ??",
          buttons: ["Lets Play !!","Game Rules", "Cancel"],
          defaultId: 0, // bound to buttons array
          cancelId: 1 // bound to buttons array
        })
        .then(result => {
          if (result.response === 0) {

          } else if (result.response === 2) {
            // bound to buttons array
            app.quit();

          }
          else if (result.response===1) {
            gameRules();
          }
        }
      );
},2000);
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
