import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const url = "http://localhost:3100/";

export const App = () => {
  const [books, setBooks] = useState(null);

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
      const response = await axios.get(url + "books");
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  // Array for the DataTable
  const columns = [
    {
      name: "Author",
      selector: "creator",
      sortable: false,
    },
    {
      name: "Book name",
      selector: "title",
      sortable: false,
    },
    {
      name: "Date added",
      selector: "added",
      sortable: false,
    },
    {
      name: "Download",
      selector: "url",
      sortable: false,
      cell: (row) => (
        <div>
          <a href={row.url}>Download</a>
        </div>
      ),
    },
  ];

  const renderTable = () => {
    if (books === null) return <DataTable progressPending noHeader />;
    else
      return (
        <DataTable
          title="Books"
          columns={columns}
          data={books}
          defaultSortField="added"
          pagination
          highlightOnHovers
          dense
          noHeader
          striped
          selectableRows
          selectableRowsHighlight
          onSelectedRowsChange={(e) => changeSelected(e)}
        />
      );
  };

  return <div>{renderTable()}</div>;
};
