import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderItems = () => {
  const [orderitems, setOrderItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getOrderItems();
  }, [searchQuery]);

  const getOrderItems = async () => {
    let apiUrl = 'http://localhost:8000/api/orderitems';

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
      setOrderItems(data);
    } else {
      alert('Something went wrong');
    }
  };

  const deleteOrderItem = async (id) => {
    const confirmDelete = window.confirm('Do you want to delete this order item?');

    if (confirmDelete) {
      await fetch(`http://localhost:8000/api/orderitem/${id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      // After deleting, refresh the order item list
      getOrderItems();
    }
  };

  const handleSearchButtonClick = () => {
    // Trigger the search action when the button is clicked
    getOrderItems();
  };

  return (
    <div>
      <h1>This is the order items page</h1>
      <h4>name of the order ||| full name of the product ||| quantity ||| total_price</h4>
      <Link to={'/orderitem/new'}>
        <button>Create</button>
      </Link>
      <input
        type="text"
        placeholder="Search Order Items"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchButtonClick}>Search</button>
      <ul>
        {orderitems.map((orderitem) => (
          <li key={orderitem.id}>
            {orderitem.NameOfTheOrder} ||||| {orderitem.FullNameofTheProduct} ||||
            {orderitem.quantity} |||| {orderitem.total_price} Dh{' '}
            <Link to={`/orderitem/${orderitem.id}`}>
              <button>Modify</button>
            </Link>{' '}
            <button onClick={() => deleteOrderItem(orderitem.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItems;
