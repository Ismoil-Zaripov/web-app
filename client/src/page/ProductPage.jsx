import {Link, useParams} from "react-router-dom";
import {deleteProduct, productsList, searchProduct} from "../service/ProductService";
import {Button, Card, Col, Container, Form, InputGroup, ListGroup, Row} from "react-bootstrap";
import {useProducts} from "../context/ProductContext";
import {ProductsList} from "../component/product/ProductsList";
import {useFavoriteProducts} from "../context/FavoriteProductsContext";
import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {UpdateProduct} from "../component/product/UpdateProduct";

export const ProductPage = () => {

    let {catalogId} = useParams()
    const [disabled, setDisabled] = useState(false)
    const [query, setQuery] = useState("")
    const [sort, setSort] = useState("new_products")
    const {accessToken, userDetails} = useAuth()

    const {products, setProducts} = useProducts()
    const {addToFavoriteList, removeFromFavoriteList} = useFavoriteProducts()

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

    const handleSearch = () => {
        if (query.trim().length <= 3) {
            setDisabled(true)
        } else {
            setDisabled(false)
            searchProduct(sort, query, accessToken)
                .then(response => {
                    if (response.status === 200) {
                        setProducts(response.data)
                    }
                })
        }
    }

    return (!catalogId ? (
        <>
            <Container>
                <Row className={"my-5"}>

                    <Col className={"my-2"} sm={12} md={6} lg={{span: 4, offset: 0}} xl={{span: 3, offset: 0}}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                isInvalid={disabled}
                                onChange={(e) => {
                                    setDisabled(false)
                                    setQuery(e.target.value)
                                }}
                                placeholder="e.g: Laptop"
                                aria-label="e.g: Laptop"
                                aria-describedby="basic-addon2"
                            />
                            <Button
                                onClick={handleSearch}
                                variant="primary"
                                id="button-addon2">
                                <i className="bi bi-search"></i>
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                Search term must be at least 3 characters long!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>

                    <Col className={"my-2"} sm={12} md={6} lg={{span: 4, offset: 4}} xl={{span: 3, offset: 6}}>
                        <Form.Select onChange={(e) => {
                            switch (e.target.value) {
                                case "1":
                                    setSort("high_price");
                                    break;
                                case "2":
                                    setSort("low_price");
                                    break;
                                case "3":
                                    setSort("new_products");
                                    break;
                                default:
                                    break;
                            }
                        }} aria-label="Default select example">
                            <option defaultValue disabled>Sort by</option>
                            <option value="1">High price</option>
                            <option value="2">Low price</option>
                            <option value="3">New</option>
                        </Form.Select>
                    </Col>

                </Row>
                <Row className={"my-4"}>
                    {
                        products.map(p => (
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
    ) : (
        <ProductsList catalogId={catalogId}/>
    ))
}