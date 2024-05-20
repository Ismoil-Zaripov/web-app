import {useEffect, useState} from "react";
import {Col, Container, Table} from "react-bootstrap";
import {getAllOrders, getAllOrdersByEmail} from "../service/OderService";
import {useAuth} from "../context/AuthContext";

export const OrdersPage = () => {

    const [orders, setOrders] = useState([])
    const {userDetails, accessToken} = useAuth()

    function fetchAllOrders() {
        getAllOrders(accessToken)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    setOrders(response.data)
                }
            })
    }

    function fetchAllOrdersByEmail() {
        getAllOrdersByEmail(userDetails.email, accessToken)
            .then(response => {
                if (response.status === 200) {
                    setOrders(response.data)
                }
            })
    }

    useEffect(() => {
        if (!!userDetails) {
            // alert(userDetails.role)
            console.log(userDetails.role)
            if (userDetails.role === "ADMIN") {
                fetchAllOrders()
            }

            if (userDetails.role === "USER") {
                fetchAllOrdersByEmail()
            }
        }
    }, []);

    const Order = ({user, products}) => {

        return (
            <>{products.map(p => (
                <tr key={p.productId}>
                    <td>{p.productId}</td>
                    <td>{user.email}</td>
                    <td>{p.productName}</td>
                    <td>{p.price}</td>
                    <td>{p.catalog.catalogName}</td>
                </tr>
            ))}</>
        )

    }

    return (
        <>
            <Container>
                <Col className={"my-5"}>

                    <>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Ordered user</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Brand</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(o => (
                                <Order products={o.products} user={o.user}/>
                            ))}
                            </tbody>
                        </Table>
                    </>
                </Col>
            </Container>
        </>
    );
}