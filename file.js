const fs = require('fs');
const path = require('path');
const axios = require('axios');

const File = {
    async download(fileUrl, directory) {
        if (!directory.endsWith('/')) directory += '/'

        // TODO esto es medio hardcodeado por las imágenes de instagram
        // ver si hay alguna forma de hacerlo genérico para cualquier URL
        const fileName = path.basename(fileUrl).split('?')[0];
        const localFilePath = directory + fileName;

        console.log('Utils.File.download localFilePath', localFilePath);

        // Lanzamos la petición de descarga del fichero
        const response = await axios.get(
            fileUrl, { responseType: 'stream' }
        ).catch(error => {
            console.log('Utils.File.download -> Error al intentar descargar el archivo', {
                status: error.response.status,
                statusText: error.response.statusText,
                fileUrl,
                localFilePath
            });
            throw Error('Error al descargar el archivo con URL ' + fileUrl);
        });
        
        // Guardamos el fichero en el sistema de archivos local
        await new Promise(resolve => {
            const w = response.data.pipe(
                fs.createWriteStream(localFilePath)
            );
            
            w.on('finish', () => {
                resolve();
            });
        });

        // Devolvemos el path del fichero generado
        return localFilePath;
    },
    getExtension(fileName) {
        const parts = fileName.split('.')
        const lastPart = parts[parts.length - 1]
        
        return '.' + lastPart
    },
    getName(filePath) {
        const parts = filePath.split('/')
        const lastPart = parts[parts.length - 1]

        return lastPart
    }
}