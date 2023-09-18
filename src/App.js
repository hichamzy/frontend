import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext';
import AuthContext from './context/AuthContext';
import Clients from './pages/Clients';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Orders from './pages/Orders';
import OrderItems from './pages/OrderItems';
import ClientPage from './SinglePages/ClientPage';
import ProductPage from './SinglePages/ProductPage';
import SupplierPage from './SinglePages/SupplierPage';
import OrderPage from './SinglePages/OrderPage';
import OrderItemPage from './SinglePages/OrderItemPage';
import OrderDetail from './SinglePages/OrderDetail';

function App() {
  return (
    
    <div className="App">
      <Router>
      <AuthProvider>
          <Header />
          
          <Routes>
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/clients' element={<PrivateRoute><Clients/></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
            <Route path="/suppliers" element={<PrivateRoute><Suppliers /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path="/orderItems" element={<PrivateRoute><OrderItems /></PrivateRoute>} />
            <Route path="/client/:id" element={<PrivateRoute><ClientPage/></PrivateRoute>} />
            <Route path="/product/:id" element={<PrivateRoute><ProductPage/></PrivateRoute>} />
            <Route path="/supplier/:id" element={<PrivateRoute><SupplierPage/></PrivateRoute>} />
            <Route path="/order/:id" element={<PrivateRoute><OrderPage/></PrivateRoute>} />
            <Route path="/orderitem/:id" element={<PrivateRoute><OrderItemPage/></PrivateRoute>} />
            <Route path="/orderdetails/:id" element={<PrivateRoute><OrderDetail/></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
