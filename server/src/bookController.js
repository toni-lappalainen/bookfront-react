const fs = require('fs');
const path = require('path');
const EPub = require('epub');

// TODO: local url is different
const port = process.env.PORT | 3222;
const dev = process.env.NODE_ENV !== 'production';
const baseUrl = dev ? `http://localhost:${port}/` : process.env.URL;

const directoryPath = path.join(__dirname, '/../res/books/');
console.log(directoryPath);

// Creates the info for individual book
const createInfo = async (book) => {
	return new Promise((resolve) => {
		const epub = new EPub(
			directoryPath + book,
			'/imagewebroot/',
			'/articlewebroot/'
		);
		epub.parse();
		epub.on('error', function (err) {
			console.log('ERROR\n-----');
			throw err;
		});
		epub.on('end', function () {
			const bookInfo = {
				title: epub.metadata.title,
				creator: epub.metadata.creator,
			};
			resolve(bookInfo);
		});
	});
};

// returns the list of books in the server and creates infos for them
const getBookList = (req, res) => {
	fs.readdir(directoryPath, async (err, books) => {
		if (err) {
			res.status(500).send({
				message: 'Unable to scan files!',
			});
			return;
		}

		let bookInfos = [];

		for (const book of books) {
			const info = await createInfo(book);
			bookInfos.push({
				creator: info.creator,
				title: info.title,
				url: baseUrl + 'bookfront-api/v1/books/' + book,
			});
		}

		res.status(200).send(bookInfos);
	});
};

// Download individual book
const downloadBook = (req, res) => {
	const bookName = req.params.name;

	res.download(directoryPath + bookName, bookName, (err) => {
		if (err) {
			res.status(500).send({
				message: 'Could not download the file. ' + err,
			});
		}
	});
};

module.exports = { getBookList, downloadBook };
