const fs = require("fs");
const EPub = require("epub");

const baseUrl = "http://localhost:3100/";
const directoryPath = __basedir + "/../res/books/";

const createInfo = (book) => {
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
  return new Promise((resolve) => {
    epub.on("end", function () {
      // epub is initialized now
      console.log(epub.metadata.title);
      const bookInfo = { title: epub.metadata.title };
      console.log("p: " + bookInfo.title);
      resolve(bookInfo.title);
    });
  });
};

const getBookList = async (req, res) => {
  fs.readdir(directoryPath, (err, books) => {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
      return;
    }

    let bookInfos = [];

    books.forEach(async (book) => {
      let title = await createInfo(book);
      bookInfos.push({
        name: book,
        url: baseUrl + book,
        title: title,
      });
    });

    console.log(bookInfos);
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
