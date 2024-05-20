import {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {catalogsList, createCatalog} from "../../service/CatalogService";
import {useCatalogs} from "../../context/CatalogContext";


export const CreateCatalog = () => {

    const [show, setShow] = useState(false);
    const [catalogName, setCatalogName] = useState("")
    const {setCatalogs} = useCatalogs()
    const [errorMessage, setErrorMessage] = useState("")
    const [messageAlert, setMessageAlert] = useState(false)
    const [disable, setDisable] = useState(false)

    const handleClose = () => {
        setShow(false)
        setMessageAlert(false)
        setErrorMessage("")
    };
    const handleShow = () => {
        setShow(true)
        setDisable(true)
        setTimeout(() => setDisable(false), 3000)
    };
    const saveCatalog = () => {

        if (!catalogName || catalogName.length < 3) {
            setMessageAlert(true)
            setErrorMessage("mazgi")
        } else {

            createCatalog({catalogName})
                .then(response => {
                    if (response.status === 200) {

                        catalogsList().then(res => {
                            setCatalogs(res.data)
                            handleClose()
                            setCatalogName("")
                        })
                    }

                    if (response.status === 400) {
                        setErrorMessage(response.message)
                        setMessageAlert(true)
                    }
                })
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add catalog
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create catalog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Enter catalog name</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={catalogName}
                                isInvalid={messageAlert}
                                onChange={(e) => {
                                    setMessageAlert(false)
                                    setCatalogName(e.target.value)
                                }}
                                placeholder="e.g: Laptop"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {errorMessage}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveCatalog} disabled={disable}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}