import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {catalogsList, deleteCatalog} from "../service/CatalogService";
import {CreateCatalog} from "../component/catalog/CreateCatalog";
import {useCatalogs} from "../context/CatalogContext";
import {UpdateCatalog} from "../component/catalog/UpdateCatalog";
import {useAuth} from "../context/AuthContext";
import {useEffect} from "react";

export const CatalogPage = () => {

    const {catalogs, setCatalogs} = useCatalogs()
    const {userDetails} = useAuth()

    useEffect(() => {
        catalogsList()
            .then(res => {
                if (res.status === 200) {
                    setCatalogs(res.data)
                }
            })
    }, []);

    const removeCatalog = (c) => {
        deleteCatalog(c).then(status => {
            if (status === 200) {
                catalogsList().then(response => {
                    setCatalogs(response.data)
                })
            }
        })
    }

    const privateOptions = () => {

        if (userDetails === null) return <></>
        if (userDetails.role === "ADMIN"){
            return (
                <Col className={"my-2"} sm={12} md={6} lg={4} xl={3} xxl={3}>
                    <CreateCatalog/>
                </Col>
            )
        }
    }

    return (
        <>
            <Container fluid>
                <Container>
                    <Row className={"pt-4"}>
                        {privateOptions()}

                    </Row>
                </Container>
                <hr/>
            </Container>
            <Container>
                <Row>
                    {
                        catalogs.map(c => (
                            <Col key={c.catalogId} className={"p-0"} sm={12} md={6} lg={6} xl={4} xxl={3}>
                                <Card className={"m-2"}>
                                    <Card.Body>
                                        <Card.Title>{c.catalogName}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer className={"d-flex fs-4 align-items-center justify-content-end"}>

                                        {!!userDetails && userDetails.role ==="ADMIN" && (
                                            <>
                                                <UpdateCatalog catalogId={c.catalogId} catalogName={c.catalogName}/>
                                                <i role={"button"} onClick={() => removeCatalog(c.catalogId)}
                                                   className="text-danger mx-2 bi bi-trash-fill"></i>
                                            </>
                                        )}
                                        <Link to={`/products/${c.catalogId}`} className={"nav-link"}>
                                            <i className="text-primary mx-2 bi bi-arrow-up-right-circle-fill"></i>
                                        </Link>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}