import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderItem, setOrderItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    order: '',
    product: '',
    quantity: '',
  });

  useEffect(() => {
    if (id === 'new') {
      // Handle the case for creating a new order item here, if needed
      fetchOrders();
      fetchProducts();
      return;
    }

    const fetchOrderItem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/orderitem/${id}/`);
        const data = await response.json();
        setOrderItem(data);

        setFormData({
          order: data.order,
          product: data.product,
          quantity: data.quantity,
        });
      } catch (error) {
        console.error('Error fetching order item:', error);
      }
    };

    fetchOrderItem();
    fetchOrders();
    fetchProducts();
  }, [id]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setOrders(data);
      } else {
        alert('Something went wrong while fetching orders.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setProducts(data);
      } else {
        alert('Something went wrong while fetching products.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateOrderItem = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/orderitem/${id}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/orderitems');
      } else {
        console.error('Failed to update order item.');
      }
    } catch (error) {
      console.error('Error updating order item:', error);
    }
  };

  const createOrderItem = async (e) => {
    e.preventDefault();

    console.log(formData)
      
      const response = await fetch('http://localhost:8000/api/orderitem/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      
        // Clear the form and update the order items list
        setFormData({
          order: '',
          product: '',
          quantity: '',
        });
        navigate('/orderitems');
      
    
  };

  return (
    <div>
      <h1>Order Item Page</h1>

      <form onSubmit={orderItem ? updateOrderItem : createOrderItem}>
        <div>
          <label htmlFor="order">Order:</label>
          <select
            id="order"
            name="order"
            value={formData.order}
            onChange={handleInputChange}
          >
            <option value="">Select an Order</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="product">Product:</label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
          >
            <option value="">Select a Product</option>
            {products.map((product) => (
              <option key={product.idproduct} value={product.idproduct}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </div>
        {/* Add fields for other order item properties here */}
        <button type="submit">{orderItem ? 'Modify' : 'Create'}</button>
      </form>
    </div>
  );
};

export default OrderItemPage;

