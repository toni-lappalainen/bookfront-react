require('dotenv').config({ path: `${__dirname}/../../.env` });
const app = require('./app');

const port = process.env.PORT || 3222;

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
