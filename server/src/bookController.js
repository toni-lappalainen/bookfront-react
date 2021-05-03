const fs = require("fs");
const EPub = require("epub");

const baseUrl = "http://localhost:3100/";
const directoryPath = __basedir + "/../res/books/";

const createInfo = async (book) => {
  return new Promise((resolve) => {
    const epub = new EPub(
      directoryPath + book,
      "/imagewebroot/",
      "/articlewebroot/",
    );
    epub.parse();
    epub.on("error", function (err) {
      console.log("ERROR\n-----");
      throw err;
    });
    epub.on("end", function () {
      const bookInfo = {
        title: epub.metadata.title,
        creator: epub.metadata.creator,
      };
      resolve(bookInfo);
    });
  });
};

const getBookList = (req, res) => {
  fs.readdir(directoryPath, async (err, books) => {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
      return;
    }

    let bookInfos = [];

    for (const book of books) {
      const info = await createInfo(book);
      bookInfos.push({
        creator: info.creator,
        title: info.title,
        url: baseUrl + "books/" + book,
      });
    }

    res.status(200).send(bookInfos);
  });
};

const downloadBook = (req, res) => {
  const bookName = req.params.name;

  res.download(directoryPath + bookName, bookName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = { getBookList, downloadBook };
