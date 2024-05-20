import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {createProduct, productsList, productsListByCatalog} from "../../service/ProductService";
import {useState} from "react";
import {useProducts} from "../../context/ProductContext";

export const CreateProduct = ({ catalogId }) => {

    const [productName, setProductName] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(1)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState("")
    const { setProducts } = useProducts()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const fetchData = () => {
        if (!catalogId) {
            productsList().then(response => {
                if (response.status === 200) {
                    setProducts(response.data)
                }
            })
        } else {
            productsListByCatalog(catalogId)
                .then(response => {
                    if (response.status === 200) {
                        setProducts(response.data)
                    }
                })
        }
    }

    const saveProduct = () => {
        const productRequest = {
            productName,
            quantity,
            price,
            catalogId
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
            <Button
                variant={"primary"}
                onClick={() => setShow(true)}
            >
                Add product
            </Button>
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
                                        defaultValue={""}
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
                                        defaultValue={""}
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
                                        defaultValue={""}
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