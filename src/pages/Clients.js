import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getClients();
  }, [searchQuery]);

  const getClients = async () => {
    let apiUrl = 'http://localhost:8000/api/Clients';

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
      setClients(data);
    } else {
      alert('Something went wrong');
    }
  };

  const deleteClient = async (id) => {
    const confirmDelete = window.confirm('Do you want to delete this client?');

    if (confirmDelete) {
      await fetch(`http://localhost:8000/api/Client/${id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      // After deleting, refresh the client list
      getClients();
    }
  };

  const handleSearchButtonClick = () => {
    // Trigger the search action when the button is clicked
    getClients();
  };

  return (
    <div>
      <h1>This is the client page</h1>
      <h4>first_name ||| last_name ||| email ||| phone_number</h4>
      <Link to={'/client/new'}>
        <button>Create</button>
      </Link>
      <input
        type="text"
        placeholder="Search Clients"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchButtonClick}>Search</button>
      <ul>
        {clients.map((client) => (
          <li key={client.idclient}>
            {client.first_name} ||||| {client.last_name} |||| {client.email} |||| {client.phone_number}
            <Link to={`/client/${client.idclient}`}>
              <button>Modify</button>
            </Link>{' '}
            <button onClick={() => deleteClient(client.idclient)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
