import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SupplierPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    products_supplied: [],
  });
  const [availableProducts, setAvailableProducts] = useState([]);

  // Function to fetch available products
  const fetchAvailableProducts = async () => {
    
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setAvailableProducts(data);
     
  }

  // Function to fetch supplier details
  const fetchSupplierDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/supplier/${id}/`);
      if (response.ok) {
        const data = await response.json();
        setSupplier(data);

        setFormData({
          name: data.name,
          products_supplied: data.products_supplied,
        });
      } else {
        throw new Error('Failed to fetch supplier details.');
      }
    } catch (error) {
      console.error('Error fetching supplier details:', error);
    }
  };

  useEffect(() => {
    fetchSupplierDetails();
    fetchAvailableProducts();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProductsSelect = (e) => {
    const selectedProductIds = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      products_supplied: selectedProductIds,
    });
  };

  const updateSupplier = async (e) => {
    e.preventDefault();
  
 
      const response = await fetch(`http://localhost:8000/api/supplier/${id}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      
        navigate('/suppliers');
       
    
  };


  const createsupplier = async () => {

    const response = await fetch('http://localhost:8000/api/supplier/create', {
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
        products_supplied: [],
      });
      navigate('/suppliers');
    }
 
};

  

  return (
    <div>
      <h1>This is the supplier page</h1>
      
        <form onSubmit={updateSupplier}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="products_supplied">Products Supplied:</label>
            <select
              multiple
              id="products_supplied"
              name="products_supplied"
              value={formData.products_supplied}
              onChange={handleProductsSelect}
            >
              {availableProducts.map((product) => (
                <option key={product.idproduct} value={product.idproduct}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          {supplier?<button type="submit">Modify</button> : <button onClick={createsupplier}>create</button>}
        </form>
      
    </div>
  );
};

export default SupplierPage;
