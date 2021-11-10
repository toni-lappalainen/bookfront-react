import React, { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import axios from 'axios';

// Creates and adds the Book list table on the page.

const dev = process.env.NODE_ENV !== 'production';
const url = dev
	? `http://localhost:3222/`
	: 'https://myrrys.fi/bookfront-api/v1/';

const App = () => {
	const [books, setBooks] = useState(null);

	// Get list of books in server
	useEffect(() => {
		async function getData() {
			try {
				const fetchData = await sendGetBookListRequest();
				console.log(fetchData);
				setBooks(fetchData);
			} catch (err) {
				console.log(err);
			}
		}
		getData();
	}, []);

	const sendGetBookListRequest = async () => {
		try {
			const response = await axios.get(url + 'books');
			console.log(response.data);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	// Array for the DataTable
	const columns = [
		{
			name: 'Author',
			selector: 'creator',
			sortable: true,
		},
		{
			name: 'Book name',
			selector: 'title',
			sortable: true,
		},
		{
			name: 'Read in browser',
			selector: 'added',
			sortable: false,
		},
		{
			name: 'Download',
			selector: 'url',
			sortable: false,
			cell: (row) => (
				<div>
					<a href={row.url}>Download</a>
				</div>
			),
		},
	];

	createTheme('books', {
		text: {
			primary: '#edd9a3',
			secondary: '#cea07e',
		},
		background: {
			default: '#000',
		},
		context: {
			background: '#cb4b16',
			text: '#FFFFFF',
		},
		divider: {
			default: '#846c5b',
		},
		action: {
			button: 'rgba(255,255,255,.5)',
			hover: 'rgba(255,255,255,.5)',
			disabled: 'rgba(255,255,255,.6)',
		},
		sortFocus: {
			default: '#cea07e',
		},
	});

	// Create a table from the books list
	const renderTable = () => {
		if (books === null) return <DataTable progressPending noHeader />;
		else
			return (
				<DataTable
					title="Books"
					theme="books"
					columns={columns}
					data={books}
					defaultSortField="author"
					pagination
					highlightOnHovers
					dense
					noHeader
				/>
			);
	};

	return <div>{renderTable()}</div>;
};

export default App;
