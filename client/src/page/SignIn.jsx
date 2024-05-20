import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {Navigate} from "react-router-dom";

export const SignInPage = () => {

    const {login, userDetails} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [show, setShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()

        if (username.trim().length > 3 && password.trim().length > 3) {
            login(username, password)
        } else setShow(true)
    }

    return userDetails !== null ? (<Navigate to={"/"}/>) : (
        <>
            <Container className={"py-5"}>
                <Row className={"my-5"}>
                    <Col md={{offset: 3, span: 6}}>
                        <Form onSubmit={handleSubmit}>
                            <h1 className={"text-center my-4"}>Login</h1>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                {show && (
                                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                    </Alert>
                                )}
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                    type="email"
                                    placeholder="Enter email"/>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    type={showPassword ? ("text") : ("password")}
                                    placeholder="Password"/>

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={() => setShowPassword(!showPassword)}
                                            label="Check me out"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}