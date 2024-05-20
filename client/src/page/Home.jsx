import {Container, Row} from "react-bootstrap";
import {CatalogPage} from "./CatalogPage";
import React from "react";

export const Home = () => {

    return (
        <>
        <Container>

            <Row>
                <CatalogPage />

            </Row>

        </Container>
        </>
    )
}