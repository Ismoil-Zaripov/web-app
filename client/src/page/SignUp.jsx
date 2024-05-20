import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {Navigate, useNavigate} from "react-router-dom";
import {doRegister} from "../service/AuthService";

export const SignUpPage = () => {

    const {userDetails} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()

        if (name.trim().length > 3 &&
            surname.trim().length > 3 &&
            username.trim().length > 3 &&
            password.trim().length > 3) {

            const registerRequest = {
                name,
                surname,
                username,
                password
            }

            doRegister(registerRequest).then(status => {
                if (status === 200) {
                    navigate("/sign-in")
                }

                if (status === 400 || status === 403) {
                    setShow(true)
                }
            })

        } else setShow(true)
    }

    return userDetails !== null ? (<Navigate to={"/"}/>) : (
        <>
            <Container className={"py-5"}>
                <Row className={"my-5"}>
                    <Col md={{offset: 3, span: 6}}>
                        <Form>
                            <h1 className={"text-center my-4"}>Register</h1>
                            <Form.Group className="mb-3">
                                {show && (
                                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                    </Alert>
                                )}
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                    type="text"
                                    placeholder="Enter name"/>

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setSurname(e.target.value)
                                    }}
                                    type="text"
                                    placeholder="Enter surname"/>

                            </Form.Group>

                            <Form.Group className="mb-3">
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
                                <Form.Check type="checkbox"
                                            onChange={() => setShowPassword(!showPassword)}
                                            label="Show password"/>
                            </Form.Group>
                            <Button variant="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}