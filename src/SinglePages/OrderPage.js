import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/Clients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setClients(data);

        // If selectedClient is empty, set it to the first client in the list
        if (!selectedClient && data.length > 0) {
          setSelectedClient(data[0].idclient);
        }
      } else {
        alert('Something went wrong while fetching clients.');
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    if (id === 'new') {
      // Initialize an empty order when creating a new one
      setOrder({
        name: '',
        client: selectedClient, // Set the selected client here
      });
      fetchClients();
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/order/${id}/`);
        const data = await response.json();
        setOrder(data);

        // Set the selected client when fetching the order data
        setSelectedClient(data.client);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
    fetchClients(); // Fetch clients for the dropdown
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  const updateOrder = async (e) => {
    e.preventDefault();

    try {
      // Update the order with the selected client
      const updatedOrder = {
        ...order,
        client: selectedClient,
      };

      const response = await fetch(`http://localhost:8000/api/order/${id}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });

      if (response.ok) {
        navigate('/orders');
      } else {
        console.error('Failed to update order.');
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      // Create a new order with the selected client
      const newOrder = {
        ...order,
        client: selectedClient,
      };

      const response = await fetch('http://localhost:8000/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <h1>Order Page</h1>
      {order !== null ? (
        <form onSubmit={id === 'new' ? createOrder : updateOrder}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={order.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="client">Client:</label>
            <select
              id="client"
              name="client"
              value={selectedClient}
              onChange={handleClientChange}
            >
              {clients.map((client) => (
                <option key={client.idclient} value={client.idclient}>
                  {client.first_name} {client.last_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">
            {id === 'new' ? 'Create' : 'Modify'}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderPage;
