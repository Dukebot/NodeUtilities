'use strict';

/**
 * La siguiente Clase (Mail), se encarga de centralizar todos los envios de MAIL que se realicen
 * desde este proyecto.
 *
 * Para poder realizar un envio de Mail habrá que instanciar la clase y dar las propiedades básicas
 * para que este se pueda enviar correctamente, si no saltará un error.
 */

const nodemailer = require('nodemailer');

const GardeniaLib = require('../../lib/gardenia_library');
const System = require('../../config/system');

function addressBuilder(contacts) {
	return contacts.reduce((string, current) => string += (string === '') ?
		`${current.name} <${current.mail}>` : `, ${current.name} <${current.mail}>`, '');
}

class Mail {
	constructor() {
		/*
		 * Estos campos se utilizan para la configuración básica para que se realicen los correos de MAIL correctamente.
		 */
		this._host = 'exchange.company.es';
		this._port = 587;
		this._secure = false; // true for port 465, false for other ports.
		this._user = null;
		this._password = 'YourPassword';

		/*
		 *
		 * Pequeña explicación de los diferentes campos permitidos por el Mail:
		 *
		 * from - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted ’“Sender Name” sender@server.com‘, see Address object for details
		 * to - Comma separated list or an array of recipients email addresses that will appear on the To: field
		 * cc - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
		 * bcc - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
		 * subject - The subject of the email
		 * text - The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…’})
		 * html - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…‘})
		 * attachments - An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well.
		 *
		 * Para obtener más información y más campos _> "https://nodemailer.com/message/"
		 */
		this._from = null;
		this._to = null;
		this._cc = null;
		this._bcc = null;
		this._subject = null;
		this._text = '';
		this._content = null;
		this._attachments = null;
	}

	send() {
		return new Promise((resolve, reject) => {
			let from = `fromAddress`;
			let to = addressBuilder(this._to);
			let cc = '';
			let bcc = '';

			if (this._cc && this._cc.length > 0) {
				cc = addressBuilder(this._cc);
			}

			if (this._bcc && this._bcc.length > 0) {
				bcc = addressBuilder(this._bcc);
			}

			nodemailer.createTestAccount((error, account) => {
				// Creamos un transporte por defecto para SMTP
				let transporter = nodemailer.createTransport({
					host: this._host,
					port: this._port,
					secure: this._secure,
					auth: {
						user: `${this._user}@company.es`,
						pass: this._password,
					},
				});

				// Aplicamos la configuración para realizar el envío del Mail.
				let mail_options = {
					from,
					to,
					cc,
					bcc,

					subject: this._subject,
					text: this._text,
					html: this._content,

					attachments: this._attachments
				};

				// Se realiza el envio de Mail.
				transporter.sendMail(mail_options, (error, information) => {
					if (error) {
						console.log(error);
						// Indicamos que la tarea del System se ha terminado, para en un futuro poder finalizar
						// el proceso.
						System.end();
						reject(error);
					}

					console.log('Mail sent to the appropriate department'.magenta);

					// Indicamos que la tarea del System se ha terminado, para en un futuro poder finalizar el
					// proceso.
					System.end();

					resolve(true);
				});
			});
		});
	}


	/*
	 *
	 *
	 * GETTERS & SETTERS
	 *
	 *
	 */

	set user(value) {
		this._user = value;
	}

	set from(value) {
		this._from = value;
	}

	set to(value) {
		this._to = value;
	}

	set cc(value) {
		this._cc = value;
	}

	set bcc(value) {
		this._bcc = value;
	}

	set subject(value) {
		this._subject = value;
	}

	set text(value) {
		this._text = value;
	}

	set content(value) {
		this._content = value;
	}

	set attachments(value) {
		this._attachments = value;
	}
}

module.exports = Mail;
