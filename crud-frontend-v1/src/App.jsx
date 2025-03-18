import "./App.css";
import Navbar from "./components/Navbar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const [searchText, setSearchText] = useState("");

  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState([null]);

  const handleOpen = (mode) => {
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleSubmit = async (name, email, job, rank, status) => {
    console.log(name, email);
    if (modalMode === "add") {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/clients",
          {},
          {
            params: {
              name,
              email,
              job,
              rank,
              status,
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const { data } = await axios.put(
          "http://localhost:3000/api/clients",
          {},
          {
            params: {
              name,
              email,
              job,
              rank,
              status,
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
    setIsOpen(false);
  };

  const handleChange = async (e) => {
    if (e.Key === "Enter") {
      console.log("first");
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/clients/search?q=${searchText}`
        );
        console.log(data);
        setTableData(data);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/clients");
        console.log(data);
        setTableData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* ++ py-5 px-5 */}
      <div className="py-5 px-5 ">
        <Navbar
          searchText={searchText}
          handleChange={handleChange}
          onOpen={() => handleOpen("add")}
          setSearchText={setSearchText}
        />
        <TableList tableData={tableData} onOpen={() => handleOpen("edit")} />
        <ModalForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode={modalMode}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default App;
