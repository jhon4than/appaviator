import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { saveAs } from "file-saver";
import ReactPaginate from "react-paginate";
import "./Users.css";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 10;
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contents"));
        const userDataArray = [];
        querySnapshot.forEach((doc) => {
          userDataArray.push(doc.data());
        });
        setUserData(userDataArray);
        setFilteredData(userDataArray); // Inicializa a lista de dados filtrados com todos os dados
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    fetchData();
  }, [db]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = () => {
    const newFilteredData = userData.filter((user) => {
      if (!searchTerm) {
        return true;
      }
      return (
        (user.desc &&
          user.desc.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.name &&
          user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    setFilteredData(newFilteredData);
    setCurrentPage(0); // Retorna à primeira página ao realizar uma nova busca
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const paginatedData = filteredData.slice(offset, offset + itemsPerPage);

  const exportToCSV = () => {
    const csvData = userData
      .map((user) => `${user.desc},${user.name}`)
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "usuarios.csv");
  };

  return (
    <div className="admin-container">
      <h1>Lista de Usuários</h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button className="search-button" onClick={handleSearch}>
        Buscar
      </button>
      <button className="export-button" onClick={exportToCSV}>
        Exportar para CSV
      </button>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Número de WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user, index) => (
            <tr key={index}>
              <td>{user.desc}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Próxima"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Users;
