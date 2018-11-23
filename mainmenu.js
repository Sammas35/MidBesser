const {Menu} = require('electron')
const electron = require('electron')
const {dialog} = require('electron')
const path = require('path')
const app = electron.app
function getFileToOpen() {

    return dialog.showOpenDialog({
        title: 'Charakter laden',
        defaultPath: './chars',
        filters: [
            {name: 'Characters', extensions: ['char']}
        ]
    })
}

const template = [
    {
        label: 'Charaktere',
        submenu: [
            {
                label: 'Neu',
                accelerator: 'CmdOrCtrl+N',
                type: 'normal',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.webContents.send('newChar')
                    }
                }
            },
            {
                label: 'Speichern',
                accelerator: 'CmdOrCtrl+S',
                type: 'normal',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.webContents.send('saveChar')
                    }
                }
            },
            {
                label: 'Öffnen',
                accelerator: 'CmdOrCtrl+O',
                type: 'normal',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        let fileNames = getFileToOpen()
                        let filename;

                        if (fileNames) {
                            filename = path.basename(fileNames[0])
                            focusedWindow.webContents.send('openChar', filename);
                        }
                    }
                }
            }
        ]
    },
    {
        label: 'Ansicht',
        submenu: [
            {
                label: 'Neustart',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload()
                }
            },
            {
                label: 'Entwickler Werkzeuge',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Standardzoom',
                role: 'resetzoom'
            },
            {
                label: 'Vergrößern',
                role: 'zoomin'
            },
            {
                label: 'Verkleinern',
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                label: 'Vollbild',
                role: 'togglefullscreen'
            }
        ]
    },
    {
        label: 'Fenster',
        role: 'window',
        submenu: [
            {
                label: 'Minimieren',
                role: 'minimize'
            },
            {
                label: 'Schliessen',
                role: 'close'
            }
        ]
    },
    {
        label: 'Hilfe',
        role: 'help',
        submenu: [
            {
                label: 'Was soll das?',
                click() {
                    require('electron').shell.openExternal('http://electron.atom.io')
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
        label: name,
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    })
    // Edit menu.
    template[1].submenu.push(
        {
            type: 'separator'
        },
        {
            label: 'Speech',
            submenu: [
                {
                    role: 'startspeaking'
                },
                {
                    role: 'stopspeaking'
                }
            ]
        }
    )
    // Window menu.
    template[3].submenu = [
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: 'Zoom',
            role: 'zoom'
        },
        {
            type: 'separator'
        },
        {
            label: 'Bring All to Front',
            role: 'front'
        }
    ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)