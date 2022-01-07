const Path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const dir = Path.join(require('os').homedir(), 'Documents/PlantOverviewData/');
const uploadsPath = Path.join(require('os').homedir(), 'Documents/PlantOverviewData/media/');
const imagesPath = uploadsPath+'images';
const filesPath = uploadsPath+"files";
window.globalDir = dir;
const database = new sqlite3.Database(dir + 'db.sqlite3', (err) => {
    if (err) console.error('Database opening error: ', err);
});

window.getFileSteam = (filePath) => {
    return fs.readFileSync(filePath,{encoding:'base64'});
}

window.database = {
    getRow:function(sql){
        return new Promise(function(resolve,reject) {
            database.get(sql, (err, row) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(row);
                }

            });
        })
    },
    getRows:function(sql){
        return new Promise(function(resolve,reject) {
            database.all(sql, (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }

            });
        })
    },
    insertRow:function(sql){
        return new Promise(function(resolve,reject) {
            database.run(sql, function(err,result){
                if (err) {
                    reject(err.message);
                } else {
                   resolve(this.lastID);
                }
            });
        });
    },
    deleteRow:function(sql){
        return new Promise(function(resolve,reject) {
            database.run(sql, function(err,result){
                if (err) {
                    reject(err.message);
                } else {
                    resolve(true);
                }
            });
        });
    }
}


