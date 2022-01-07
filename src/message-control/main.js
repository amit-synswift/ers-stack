const { ipcMain,dialog } = require('electron');
const sqlite3 = require('sqlite3');
const Path = require('path');
const fs = require('fs');
const dataurl = require('dataurl');
const dir = Path.join(require('os').homedir(), 'Documents/PlantOverviewData/');
const uploadsPath = Path.join(require('os').homedir(), 'Documents/PlantOverviewData/media/');
const imagesPath = uploadsPath+'images';
const filesPath = uploadsPath+"files";
const { v4: uuidv4 } = require('uuid');


if(!fs.existsSync(dir)){
    console.log('Creating data directory...');
    fs.mkdirSync(dir);
}
if(!fs.existsSync(uploadsPath)){
    console.log('Creating media directory...');
    fs.mkdirSync(uploadsPath);
}
if(!fs.existsSync(imagesPath)){
    console.log('Creating images directory...');
    fs.mkdirSync(imagesPath);
}
if(!fs.existsSync(filesPath)){
    console.log('Creating files directory...');
    fs.mkdirSync(filesPath);
}
let database = null;
if(!fs.existsSync(dir+'db.sqlite3')){
    console.log('database file not found, creating one....');
    fs.copyFileSync('./public/db.sqlite3',dir + 'db.sqlite3');
    database = new sqlite3.Database(dir + 'db.sqlite3', (err) => {
        if (err) console.error('Database opening error: ', err);
    });
} else {
    database = new sqlite3.Database(dir+'db.sqlite3', (err) => {
        if (err) console.error('Database opening error: ', err);
    });
}


ipcMain.on('db-get',(event,arg) => {
    database.get(arg, (err, row) => {
        if (err) {
            event.reply('db-get-error',err.message);
        } else {
            event.reply('db-get-result', row);
        }
    });
})
ipcMain.on('db-get-all',(event,arg) => {
    database.all(arg, (err, rows) => {
        if (err) {
            event.reply('db-get-all-error',err.message);
        } else {
            event.reply('db-get-all-result', rows);
        }
    });
})
ipcMain.on('db-insert',(event,arg) => {
    database.run(arg, function(err,result){
        if (err) {
            event.reply('db-insert-error',err.message);
        } else {
            event.reply('db-insert-success', this.lastID);
        }
    });
});

ipcMain.on('db-delete',(event,arg) => {
    database.run(arg, (err,result) => {
        if (err) {
            event.reply('db-delete-error',err.message);
        } else {
            event.reply('db-delete-success');
        }
    });
});

/**
 * Image upload handle
 */

ipcMain.on('select-image', (event, arg) => {

    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Image', extensions: ['jpg','jpeg', 'png', 'gif'] },
        ]
    }).then(result => {

        // checks if window was closed
        if (result.canceled) {
            event.reply('image-selected-error','File selection empty');
        } else {
            console.log(result);
            // get first element in array which is path to file selected
            const filePath = result.filePaths[0];

            // get file name
            const fileName = Path.basename(filePath);

            event.reply('image-selected',{
                name:fileName,
                path:filePath
            });
        }
    });
});


ipcMain.on('select-file', (event, arg) => {

    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'File', extensions: ['jpg','jpeg', 'png', 'gif', 'pdf','mp4'] },
        ]
    }).then(result => {

        // checks if window was closed
        if (result.canceled) {
            event.reply('file-selected-error','File selection empty');
        } else {
            console.log(result);
            // get first element in array which is path to file selected
            const filePath = result.filePaths[0];

            // get file name
            const fileName = Path.basename(filePath);

            event.reply('file-selected',{
                name:fileName,
                path:filePath
            });
        }
    });
});

ipcMain.on('image-copy', (event, arg) => {
    const fileName = uuidv4() + Path.basename(arg);
    fs.copyFile(arg,imagesPath+'/'+fileName, (err) => {

        event.reply('image-copied',fileName);
    });

});

ipcMain.on('process-markers',  (event, markers) => {
    let myMarkers = [];
    const markers_updated = markers.map(async (marker) => {
        let fileName = '';
        if(!fs.existsSync(imagesPath+'/'+marker.settings.file) && marker.settings.type !== 'link') {
            fileName = uuidv4() + Path.basename(marker.settings.file);
            await fs.copyFileSync(marker.settings.filePath, filesPath + '/' + fileName);
        }
        myMarkers.push({
            ...marker,
            settings:{
                ...marker.settings,
                file:fileName,
            }
        });
        return {
            ...marker,
            settings:{
                ...marker.settings,
                file:fileName,
            }
        }
    });
    Promise.all(markers_updated).then(() => {
        console.log(myMarkers);
        event.reply('processed-markers',JSON.stringify(myMarkers));
    });
});
