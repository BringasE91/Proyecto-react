/* importar css */
import { useState } from "react";  


function Searchbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if(searchTerm.trim()) {
    onSearch(searchTerm);
    setSearchTerm("");
  }};

  return (
    <div className="searchbar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar..."
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default Searchbar;


