const electron = window.require('electron');
const { ipcRenderer } = electron;

const getRow = (sql) => {
    return new Promise((resolve,reject) => {
        ipcRenderer.once('db-get-result', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.once('db-get-error', (_, arg) => {
            reject(arg);
        });
        ipcRenderer.send('db-get', sql);
    });
}

const getRows = (sql) => {
    return new Promise((resolve,reject) => {
        ipcRenderer.once('db-get-all-result', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.once('db-get-all-error', (_, arg) => {
            reject(arg);
        });
        ipcRenderer.send('db-get-all', sql);
    });
}

const insert = (sql) => {
    return new Promise((resolve,reject) => {
        ipcRenderer.once('db-insert-success', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.once('db-insert-error', (_, arg) => {
            reject(arg);
        });
        ipcRenderer.send('db-insert', sql);
    });
}
const insertPointers = (markers) => {
    return new Promise((resolve,reject) => {
        ipcRenderer.once('db-insert-pointers-success', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.once('db-insert-pointers-error', (_, arg) => {
            reject(arg);
        });
        ipcRenderer.send('db-insert-pointers', markers);
    });
}
const deleteRow = (sql) => {
    return new Promise((resolve,reject) => {
        ipcRenderer.once('db-delete-success', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.once('db-delete-error', (_, arg) => {
            reject(arg);
        });
        ipcRenderer.send('db-delete', sql);
    });
}
const selectImage = (data) => {
    return new Promise((resolve,reject) => {
        ipcRenderer.once('image-selected', (_, arg) => {
            resolve(arg);
        });

        ipcRenderer.send('select-image', data);
    });
}

const selectFile = (data) => {
    return new Promise((resolve,reject) => {
        ipcRenderer.once('file-selected', (_, arg) => {
            resolve(arg);
        });

        ipcRenderer.send('select-file', data);
    });
}
const getImage = (data) => {
    return new Promise((resolve,reject) => {
        ipcRenderer.once('file-stream', (_, arg) => {
            resolve(arg);
        });

        ipcRenderer.send('get-file-stream', data);
    });
}

const processImage = (filePath) => {
    console.log(filePath);
    return new Promise((resolve,reject) => {
        ipcRenderer.once('image-copied', (_, arg) => {
            resolve(arg);
        });

        ipcRenderer.send('image-copy',filePath);
    });
}

const processMarkerFiles = (markers) => {
    console.log(markers);
    return new Promise((resolve,reject) => {
        ipcRenderer.once('processed-markers', (_, arg) => {
            resolve(arg);
        });

        ipcRenderer.send('process-markers',markers);
    });
}
export default {
    getRow,
    getRows,
    insert,
    selectImage,
    getImage,
    selectFile,
    deleteRow,
    processImage,
    insertPointers,
    processMarkerFiles
}
