import {useFavoriteProducts} from "../context/FavoriteProductsContext";
import {useEffect, useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useAuth} from "../context/AuthContext";
import {getAllOrdersByEmail, makeOrder} from "../service/OderService";
import {useNavigate} from "react-router-dom";

export const FavoritesPage = () => {

    const {favoriteList, removeFromFavoriteList} = useFavoriteProducts()
    const {userDetails, accessToken} = useAuth()
    const [orders, setOrders] = useState()
    const navigate = useNavigate()

    const sendOrder = () => {

        if (!!userDetails) {
            makeOrder(userDetails.email, favoriteList, accessToken).then(status => {

                if (status === 200) {
                    getAllOrdersByEmail(userDetails.email, accessToken).then(response => {
                        if (response.status === 200) {
                            setOrders(response.data)
                            console.log("orders = ", response.data)
                        }
                    })
                }
            })
        } else {
            navigate("/sign-in")
        }
    }

    return (
        <>
            <Container>
                <Row className={"my-5"}>
                    <Col>
                        <Table bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Brand</th>
                                <th>Remove</th>
                            </tr>
                            </thead>
                            <tbody>
                            {favoriteList.map(p => (
                                <tr key={p.productId}>
                                    <td>{p.productId}</td>
                                    <td>{p.productName}</td>
                                    <td>{p.price}</td>
                                    <td>{p.catalog.catalogName}</td>
                                    <td>
                                        <Button variant={"outline-danger"}
                                                onClick={() => removeFromFavoriteList(p.productId)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col sm={12}>
                        <Button onClick={sendOrder} variant={"primary"}>Make order</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}