import {useAuth} from "../context/AuthContext";
import {Col, Container} from "react-bootstrap";

export const SettingsPage = () => {

    const {userDetails} = useAuth()
    return (
        <>
            <Container>
                <Col style={{ paddingTop: "100px", textAlign: "center" }}>
                    <h1>{userDetails.sub}</h1>
                    <h1>{userDetails.role}</h1>
                </Col>
            </Container>
        </>
    )
}