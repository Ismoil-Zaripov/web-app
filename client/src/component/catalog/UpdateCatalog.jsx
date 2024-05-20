import {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {catalogsList, updateCatalog} from "../../service/CatalogService";
import {useCatalogs} from "../../context/CatalogContext";

export const UpdateCatalog = ({catalogId, catalogName}) => {

    const {setCatalogs} = useCatalogs()
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [messageAlert, setMessageAlert] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [catalog, setCatalog] = useState({
        catalogId: 0,
        catalogName: catalogName
    });
    const handleClose = () => {
        setShow(false)
        setMessageAlert(false)
        setErrorMessage("")
    };
    const handleSubmit = () => {
        updateCatalog(catalogId, {catalogName: catalog.catalogName})
            .then(response => {
                if (response.status === 200) {
                    catalogsList()
                        .then(response => setCatalogs(response.data))
                    handleClose()
                }
                if (response.status === 400) {
                    setErrorMessage(response.message)
                    setMessageAlert(true)
                }
            })
    }

    return (
        <>
            <i role={"button"} onClick={() => {
                setShow(true)
                setDisabled(true)
                setTimeout(() => setDisabled(false), 3000)

            }} className="text-warning mx-2 bi bi-pencil-square"></i>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit catalog</Modal.Title>
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
                                    setCatalog({
                                        catalogId: catalogId,
                                        catalogName: e.target.value
                                    })
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
                    <Button variant="primary" onClick={handleSubmit} disabled={disabled}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

