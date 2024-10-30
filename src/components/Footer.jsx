import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
    <footer>
        <Container>
        <Row>
            <Col className="text-center py-4">
            &copy; {new Date().getFullYear()} RMC Chatbot
            </Col>
        </Row>
        </Container>
    </footer>
);

export default Footer;
