import { useParams } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import { useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from "../components/Rating";
import { ListGroup, Card } from 'react-bootstrap';
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Helmet } from 'react-helmet-async';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../util";
import { useContext } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer((reducer), {
    product: [],
    loading: true,
    error: '',
  })


  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`https://amazonbackend-kappa.vercel.app/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
      // const result = await axios.get('/api/products');
      // setProducts(result.data);
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;


  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`https://amazonbackend-kappa.vercel.app/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    })

    navigate('/cart')
  }

  return (
    <div>
      {loading ?
        (<LoadingBox />) :
        error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <Row>
              <Col md={6}>
                <img
                  className="img-large"
                  src={product.image}
                  alt={product.name}>
                </img>
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Helmet>
                      <title>{product.name}</title>
                    </Helmet>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}>
                    </Rating>
                  </ListGroup.Item>
                  <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description
                    <p>{product.description}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">

                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>${product.price}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>{product.countInStock > 0 ?
                            (<Badge bg="success">In Stock</Badge>
                            ) :
                            (<Badge bg="danger">Danger</Badge>)
                          }</Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <div className="d-grid">
                            <Button onClick={addToCartHandler} variant="primary">
                              Add to Cart
                            </Button>
                          </div>
                        </ListGroup.Item>
                      )}


                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
    </div>
  );

}



export default ProductScreen;