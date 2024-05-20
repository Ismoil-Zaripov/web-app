import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import {useProducts} from "../../context/ProductContext";
import {createProduct, productsList, productsListByCatalog} from "../../service/ProductService";

export const UpdateProduct = ({product}) => {

    const {setProducts} = useProducts()
    const [productName, setProductName] = useState(product.productName)
    const [quantity, setQuantity] = useState(product.quantity)
    const [price, setPrice] = useState(product.price)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const fetchData = () => {
        if (!product.catalog.catalogId) {
            productsList().then(response => {
                if (response.status === 200) {
                    setProducts(response.data)
                }
            })
        } else {
            productsListByCatalog(product.catalog.catalogId)
                .then(response => {
                    if (response.status === 200) {
                        setProducts(response.data)
                    }
                })
        }
    }

    const saveProduct = () => {
        const productRequest = {
            productName: productName,
            quantity: quantity,
            price: price,
            catalogId: product.catalog.catalogId
        }

        createProduct(productRequest)
            .then(response => {
                if (response.status === 200) {
                    fetchData()
                    handleClose()
                }

                if (response.status === 400) {
                    setIsError(true)
                    setMessage(response.message)
                }
            })

    };


    return (
        <>
            <i onClick={(e) => setShow(true)}
               className="text-warning me-4 bi bi-pencil-square"></i>
            <Modal show={show} onHide={handleClose} size={"xl"}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Enter product name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={product.productName}
                                        onChange={(e) => {
                                            setProductName(e.target.value)
                                            setMessage("")
                                            setIsError(false)
                                        }}
                                        placeholder="e.g: Laptop"
                                        autoFocus
                                        isInvalid={isError}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Form>
                        </Col>
                        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Enter product quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={1}
                                        defaultValue={product.quantity}
                                        onChange={(e) => {
                                            setQuantity(e.target.value)
                                            setMessage("")
                                            setIsError(false)
                                        }}
                                        placeholder="e.g: Laptop"
                                        autoFocus
                                        isInvalid={isError}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Form>
                        </Col>
                        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Enter product price</Form.Label>
                                    <Form.Control
                                        min={1}
                                        type="text"
                                        defaultValue={product.price}
                                        onChange={(e) => {
                                            setPrice(e.target.value)
                                            setMessage("")
                                            setIsError(false)
                                        }}
                                        placeholder="e.g: Laptop"
                                        autoFocus
                                        isInvalid={isError}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveProduct}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}