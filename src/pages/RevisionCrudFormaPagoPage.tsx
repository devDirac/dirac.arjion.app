import React from 'react'
import "./styles.scss";
import RevisorCrudFormaPagoScreen from '../screeens/RevisorCrudFormaPagoScreen';
import { Box } from '@mui/material';
import { Container } from 'react-bootstrap';
const RevisionCrudFormaPagoPage: React.FC = () =>
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
            <Container style={{ maxWidth: '1800px' }}>
                <RevisorCrudFormaPagoScreen />
            </Container>
        </Box>
    </Box>;
export default RevisionCrudFormaPagoPage;