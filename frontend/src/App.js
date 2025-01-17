// import './App.css';
// import data from './data';
// import {BrowserRouter,Routes,Route} from 'react-router-dom';
// import HomeScreen from './screens/HomeScreen';
// import ProductScreen from './screens/ProductScreen';
// import { Link } from 'react-router-dom';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import {LinkContainer} from 'react-router-bootstrap';

// function App() {

//   return (
//     <BrowserRouter>
//     <div className='d-flex flex-column site-container'>

//      <header> 
//       <Navbar bf="dark" variant="dark">
//       <Container>
//       <LinkContainer to="/">
//       <Navbar.Brand>amazona</Navbar.Brand>
//       </LinkContainer> 
//       </Container>
//       </Navbar> 
//       </header>



//       <main>
//       <Container>
//       <Routes>
//       <Route path="/product/:slug" element={<ProductScreen/>}/>
//       <Route path="/" element={<HomeScreen/>}/>
//       </Routes>
//       </Container>
//       </main>


//       <footer>
//       <div className='text-center'>All rights reserved</div>
//       </footer>


//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;



import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { useContext } from 'react';
import { Store } from './Store';
import { Link } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethod';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getError } from './util';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;


  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  }
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`https://amazonbackend-kappa.vercel.app/api/products/categories`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    }
    fetchCategories();
  }, []);


  return (
    <BrowserRouter>
      <div
        className={sidebarIsOpen ? "d-flex flex-column site-container active-cont"
          : "d-flex flex-column site-container"}>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>


                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >Sign Out</Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div className={
          sidebarIsOpen ?
            'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }>
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>


            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{
                    pathname: '/search',
                    search: `?category=${category}`
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}


          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            </Routes>
          </Container>
        </main>

        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
