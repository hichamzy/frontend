import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getSuppliers();
  }, [searchQuery]);

  const getSuppliers = async () => {
    let apiUrl = 'http://localhost:8000/api/suppliers';

    // Add search query parameter if a search query is provided
    if (searchQuery) {
      apiUrl += `?search=${searchQuery}`;
    }

    let response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setSuppliers(data);
    } else {
      alert('Something went wrong');
    }
  };

  const deleteSupplier = async (id) => {
    const confirmDelete = window.confirm('Do you want to delete this supplier?');

    if (confirmDelete) {
      await fetch(`http://localhost:8000/api/supplier/${id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      // After deleting, refresh the supplier list
      getSuppliers();
    }
  };

  const handleSearchButtonClick = () => {
    // Trigger the search action when the button is clicked
    getSuppliers();
  };

  return (
    <div>
      <h1>This is the suppliers page</h1>
      <Link to={'/supplier/new'}>
        <button>Create</button>
      </Link>
      <input
        type="text"
        placeholder="Search Suppliers"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchButtonClick}>Search</button>
      <h4>name ||| products_supplied</h4>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name} |||||
            {supplier.NameOfTheproductsSupplied.map((productname) => (
              <span key={productname}>||{productname}</span>
            ))}
            |||||
            <Link to={`/supplier/${supplier.id}`}>
              <button>Modify</button>
            </Link>
            <button onClick={() => deleteSupplier(supplier.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suppliers;
