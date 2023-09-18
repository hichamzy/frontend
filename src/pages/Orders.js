import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getOrders();
  }, [searchQuery]);

  const getOrders = async () => {
    let apiUrl = 'http://localhost:8000/api/orders';

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
      setOrders(data);
    } else {
      alert('Something went wrong');
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm('Do you want to delete this order?');

    if (confirmDelete) {
      await fetch(`http://localhost:8000/api/order/${id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      // After deleting, refresh the order list
      getOrders();
    }
  };

  const handleSearchButtonClick = () => {
    // Trigger the search action when the button is clicked
    getOrders();
  };

  return (
    <div>
      <h1>This is the order page</h1>
      <h4>name ||| name of the client ||| order_date ||| total_price |||| products</h4>
      <Link to={'/order/new'}>
        <button>Create</button>
      </Link>
      <input
        type="text"
        placeholder="Search Orders"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchButtonClick}>Search</button>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.name}|{order.FullNameofTheClient}|{order.order_date}|{order.total_price}
            {order.NameOfTheProducts.map((NameOfTheProduct) => (
              <span>|||{NameOfTheProduct}</span>
            ))}{' '}
            <Link to={`/order/${order.id}`}>
              <button>Modify</button>
            </Link>{' '}
            <button onClick={() => deleteOrder(order.id)}>Delete</button>{' '}
            <Link to={`/orderdetails/${order.id}`}>Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
