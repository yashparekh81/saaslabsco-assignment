import { useEffect, useState } from "react";
import "./App.css";
import { fetchProjects } from "./services/apis";
import Table from "./components/Table";
import Pagination from "./components/Pagination";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Loading all data at once, then will apply pagination on frontend side
    // For more data, it's better to do pagination on backend side
    async function fetchData() {
      const data = await fetchProjects();
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Projects</h1>
      {data.length > 0 ? (
        <>
          <Table data={data} page={page} />
          <Pagination
            page={page}
            setPage={setPage}
            totalRecords={data.length}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
