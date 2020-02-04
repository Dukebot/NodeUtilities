'use strict';

const moment   = require('moment');
const fs       = require('fs');
const rootPath = require('app-root-path');

/**Nos devuelve el rootPath del proyecto*/
let getRootPath = () => rootPath;

/**Convierte todas las palabras del String pasado como parametro en capitalice, todas sus palabras empiezan en mayuscula.*/
let toTitleCase = (str) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

/**Genera un String random de los caracteres indicados (parametro, 10 por defecto).*/
let randomString = (charNumber = 10) => {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < charNumber; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};

/**Remplaza en el String pasado como parametro (@string), el valor indicado (@search) por otro valor indicado (@replacement)*/
let replaceAll = (string, search, replacement) => string.replace(new RegExp(search, 'g'), replacement);

let isNumeric = (number) => !isNaN(parseFloat(number)) && isFinite(number);

let isString = string => typeof string === 'string';

let sort = function (array, property, order = 'ASC') {
	let operator_a;
	let operator_b;

	if (order === 'ASC') {
		operator_a = '<';
		operator_b = '>';
	} else {
		operator_a = '>';
		operator_b = '<';
	}

	if (array == undefined) {
		return;
	}

	try {
		return array.sort((a, b) => {
			let value_a = a[property];
			let value_b = b[property];

			if (
				!isNumeric(a[property]) && !isNumeric(b[property]) &&
				moment(a[property]).isValid() && moment(b[property]).isValid()
			) {
				value_a = moment(a[property]).unix();
				value_b = moment(b[property]).unix();
			}

			if (value_a && isString(value_a))
				value_a = value_a.replace('\'', '');

			if (value_b && isString(value_a))
				value_b = value_b.replace('\'', '');

			if (eval(`'${value_a}' ${operator_a} '${value_b}'`)) return -1;
			if (eval(`'${value_a}' ${operator_b} '${value_b}'`)) return 1;
			return 0;
		});
	} catch (e) {
		console.log();
		console.log(' --------------------------------------- ');
		console.log(' --------------------------------------- ');
		console.log('ERROR GARDENIA LIBRARY SORT');
		console.log('ERROR    _>  ' + e);
		console.log('PROPERTY _>  ' + property);
		console.log('ARRAY    _>');
		console.log(array);
		console.trace();
	}
};

/**Dado un array de elementos y el nombre de una propiedad, crea un mapa indexado por esa propiedad.*/
let buildMap = (dataArray, propertyName) => {
	const map = {};
	for (const data of dataArray) {
		const key = data[propertyName];
		map[key] = data;
	}
	return map;
};

/** Igual que el anterior pero acumula en un array los elementos con el mismo valor en la propiedad. */
let buildMapAccum = (dataArray, propertyName) => {
	const map = {};
	for (const data of dataArray) {
		const key = data[propertyName];
		if (!map[key])
			map[key] = [];
		map[key].push(data);
	}
	return map;
};

/**Dado un mapa, lo recorre como si fuera un array y nos devuelve el elemento con el número indicado por parámetro.*/
let getMapElementByNumber = (dataMap, elementNumber) => {
	let element;

	let count = 0;
	for (const key in dataMap) {
		element = dataMap[key];
		if (count === elementNumber) break;
		count++;
	}

	return element;
};

/** Borra un fichero en el disco de forma sincrona */
let deleteFileFromDisk = (path) => {
	try {
		fs.unlinkSync(path);
		console.log(path + " deleted");
	} catch(err) {
		console.error(err);
	}
};

/** Genera un fichero JSON a partir del objeto indicado por parámetro. Hay que indicar el path y el nombre del fichero */
let generateJsonFile = (object, path) => {
	const jsonString = JSON.stringify(object, null, 2);
	try {
		fs.writeFileSync(path, jsonString, "utf8");
		console.log(path + " has been created successfully");
	} catch (error) {
		console.log("Error generation JSON file " + path);
		console.log(error);
	}
};

/**Nos idica si el fichero existe.*/
let fileExists = (filePath) => {
	let fileExists = false;
	try {
		fs.accessSync(filePath, fs.constants.F_OK);
		fileExists = true;
		console.log(filePath + " exists");
	} catch (error) {
		console.log(filePath + " does not exist");
	}
	return fileExists;
};

/**Nos indica si el fichero tiene permisos de lectura.*/
let fileReadable = (filePath) => {
	let fileReadable = false;
	try {
		fs.accessSync(filePath, fs.constants.R_OK);
		fileReadable = true;
		console.log(filePath + " is readable");
	} catch (error) {
		console.log(filePath + " is not readable");
	}
	return fileReadable;
};

/**Nos indica si el fichero tiene permisos de escritura.*/
let fileWritable = (filePath) => {
	let fileWritable = false;
	try {
		fs.accessSync(filePath, fs.constants.W_OK);
		fileWritable = true;
		console.log(filePath + " is writable");
	} catch (error) {
		console.log(filePath + " is not writable");
	}
	return fileWritable;
};

/**Nos permite cambiar los permisos del path indicado.*/
let fileChmod = (filePath, mode) => {
    try {
        fs.chmodSync(filePath, mode);
        console.log("Chmod " + mode + " " + filePath + " has been successfull!");
    } catch (error) {
        console.log("Chmod " + mode + " " + filePath + " ERROR!", error);
    }
};


/** Para cada objeto del array, trimeamos sus propiedades de tipo String */
let trimArrayObjectProperties = (array) => {
	for (const object of array) {
		trimObjectProperties(object)
	}
};

/** Trimeamos los String de las propiedades del objeto */
let trimObjectProperties = (object) => {
	for (const key in object) {
		if (typeof object[key] === "string") {
			object[key] = object[key].trim();
		}
	}
};


/**Exportación del módulo*/
module.exports = {
	toTitleCase, randomString, replaceAll, isNumeric,
	sort, buildMap, buildMapAccum,
	getMapElementByNumber,
	fileExists, fileReadable, fileWritable, fileChmod, deleteFileFromDisk, generateJsonFile, getRootPath,
	trimArrayObjectProperties, trimObjectProperties
};
