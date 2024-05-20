import {Button, Card, Col, Container, Form, InputGroup, ListGroup, Row} from "react-bootstrap";
import {CreateProduct} from "./CreateProduct";
import {deleteProduct, productsList, searchProduct} from "../../service/ProductService";
import {useEffect, useState} from "react";
import {useFavoriteProducts} from "../../context/FavoriteProductsContext";
import {useProducts} from "../../context/ProductContext";
import {useAuth} from "../../context/AuthContext";
import {UpdateProduct} from "./UpdateProduct";

export const ProductsList = ({catalogId}) => {

    const {products, setProducts} = useProducts()
    const {accessToken, userDetails} = useAuth()
    const {addToFavoriteList, removeFromFavoriteList} = useFavoriteProducts()
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        productsList()
            .then(res => {
                if (res.status === 200) {
                    setProducts(res.data)
                }
            })
    }, []);

    const addFavorite = (e, p) => {
        const parent = e.target.closest('.d-flex');
        parent.querySelector(".heart-fill").classList.remove("d-none");
        parent.querySelector(".heart").classList.add("d-none");

        addToFavoriteList(p.productId)
    }

    const removeProductDetails = (p) => {
        deleteProduct(p.productId, accessToken)
            .then(responseStatus => {
                if (responseStatus === 200) {
                    productsList()
                        .then(res => {
                            if (res.status === 200) {
                                setProducts(res.data)
                            }
                        })
                }
            })
    }

    const removeFavorite = (e, p) => {

        const parent = e.target.closest('.d-flex');
        parent.querySelector(".heart-fill").classList.add("d-none");
        parent.querySelector(".heart").classList.remove("d-none");

        removeFromFavoriteList(p.productId)
    }

    return (
        <>
            <Container fluid>
                <Container>
                    <Row className={"pt-4"}>

                        {
                            !!userDetails && (
                                <Col className={"my-2"} sm={12} md={6} lg={4} xl={3} xxl={3}>
                                    <CreateProduct catalogId={catalogId}/>
                                </Col>
                            )
                        }

                        <Col className={"my-2"} sm={12} md={6} lg={{span: 6, offset: 2}}
                             xl={{span: 4, offset: 5}}
                             xxl={{span: 3, offset: 6}}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="e.g: Laptop"
                                    aria-label="e.g: Laptop"
                                    aria-describedby="basic-addon2"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button
                                    onClick={() => {
                                        searchProduct(catalogId, searchQuery, 0, 10)
                                            .then(response => {
                                                if (response.status === 200) {
                                                    setProducts(response.data)
                                                }
                                            })
                                    }}
                                    variant="primary"
                                    id="button-addon2">
                                    <i className="bi bi-search"></i>
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
                <hr/>
            </Container>
            <Container>
                <Row className={"my-4"}>
                    {
                        products
                            .filter(p => p.catalog.catalogId == catalogId)
                            .map(p => (
                                <Col sm={12} md={6} lg={4} xxl={3} key={p.productId}>
                                    <Card className={"my-2"}>
                                        <Card.Img
                                            variant="top"
                                            src="https://www.racedayquads.com/cdn/shop/collections/New-Products-1_1200x1195.png?v=1563400827"/>
                                        <Card.Body>
                                            <Card.Title>{p.productName}</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up
                                                the
                                                bulk of the card's content.
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>Product count : {p.quantity}</ListGroup.Item>
                                            <ListGroup.Item>Price : {p.price}</ListGroup.Item>
                                            <ListGroup.Item>Brand: {p.catalog.catalogName}</ListGroup.Item>
                                        </ListGroup>
                                        {
                                            !!userDetails && userDetails.role === "USER" && (
                                                <Card.Footer
                                                    className="d-flex align-items-center justify-content-end fs-4 fw-bold">
                                                    <i onClick={(e) => addFavorite(e, p)}
                                                       className="text-danger me-4 bi bi-heart heart"></i>
                                                    <i onClick={(e) => removeFavorite(e, p)}
                                                       className="text-danger me-4 d-none bi bi-heart-fill heart-fill"></i>
                                                </Card.Footer>
                                            )
                                        }
                                        {
                                            !!userDetails && userDetails.role === "ADMIN" && (
                                                <Card.Footer
                                                    className="d-flex align-items-center justify-content-end fs-4 fw-bold">
                                                    <UpdateProduct product={p}/>
                                                    <i onClick={(e) => removeProductDetails(p)}
                                                       className="text-danger me-4 bi bi-trash"></i>
                                                </Card.Footer>
                                            )
                                        }
                                    </Card>
                                </Col>
                            ))
                    }
                </Row>
            </Container>
        </>
    )
}