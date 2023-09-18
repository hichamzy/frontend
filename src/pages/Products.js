import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getProducts();
  }, [searchQuery]);

  const getProducts = async () => {
    let apiUrl = 'http://localhost:8000/api/products';

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
      setProducts(data);
    } else {
      alert('Something went wrong');
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm('Do you want to delete this product?');

    if (confirmDelete) {
      await fetch(`http://localhost:8000/api/product/${id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      // After deleting, refresh the product list
      getProducts();
    }
  };

  const handleSearchButtonClick = () => {
    // Trigger the search action when the button is clicked
    getProducts();
  };

  return (
    <div>
      <h1>This is the product page</h1>
      <Link to={'/product/new'}>
        <button>Create</button>
      </Link>
      <input
        type="text"
        placeholder="Search Products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchButtonClick}>Search</button>
      <h4>name || description || price</h4>
      <ul>
        {products.map((product) => (
          <li key={product.idproduct}>
            {product.name} ||||| {product.description} |||| {product.price} Dh{' '}
            <Link to={`/product/${product.idproduct}`}>
              <button>Modify</button>
            </Link>{' '}
            <button onClick={() => deleteProduct(product.idproduct)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
