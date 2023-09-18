import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClientPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });

  const createClient = async () => {

      const response = await fetch('http://localhost:8000/api/Client/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        // Clear the form and update the clients list
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
        });
        
      }
   
  };


  useEffect(() => {
    if (id === 'new') {
      return;
    }
    // Fetch client data and set it in the state
    const fetchClient = async () => {
      const response = await fetch(`http://localhost:8000/api/Client/${id}/`);
      const data = await response.json();
      setClient(data);
        
      // Set the form data with client data
      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
      });
    };

    fetchClient();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateClient = async (e) => {
    e.preventDefault();

    // Submit the modified data to the server
    const response = await fetch(`http://localhost:8000/api/Client/${id}/update/`, {
      method: 'PUT', // Use the appropriate HTTP method for updating data
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    navigate('/clients')
  };

  return (
    <div>
      <h1>Client Page</h1>
      
        <form onSubmit={updateClient}>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="phone_number">Phone Number:</label>
            <input type="text" id="phone_number"name="phone_number" value={formData.phone_number} onChange={handleInputChange}  />
          </div>
          {client?<button type="submit">Modify</button> : <button onClick={createClient}>create</button>}
        </form>

    </div>
  );
};

export default ClientPage;