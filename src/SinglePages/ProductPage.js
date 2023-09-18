import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    if (id === 'new') {
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}/`);
        const data = await response.json();
        setProduct(data);

        setFormData({
          
          name: data.name,
          description: data.description,
          price: data.price,
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

   
      const response = await fetch(`http://localhost:8000/api/product/${id}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      navigate('/products');
      
    }

  const createProduct = async () => {

    const response = await fetch('http://localhost:8000/api/product/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      // Clear the form and update the clients list
      setFormData({
        name: '',
        description: '',
        price: '',
      });
      navigate('/products');
    }
  };

  return (
    <div>
      <h1>Product Page</h1>
      
        <form onSubmit={updateProduct}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name"  name="name" value={formData.name} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
           <input type="text" id="price" name="price" value={formData.price} onChange={handleInputChange} />
          </div>
          {product?<button type="submit">Modify</button> : <button onClick={createProduct}>create</button>}
          
        </form>
      
    </div>
  );
};

export default ProductPage;
