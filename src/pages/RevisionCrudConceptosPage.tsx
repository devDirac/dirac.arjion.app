import React from 'react'
import "./styles.scss";
import RevisorCrudConceptosScreen from '../screeens/RevisorCrudConceptosScreen';
import { Box } from '@mui/material';
import { Container } from 'react-bootstrap';
const RevisionCrudConceptosPage: React.FC = () => (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
            <Container style={{ maxWidth: '1800px' }}>
                <RevisorCrudConceptosScreen />
            </Container>
        </Box>
    </Box>
);
export default RevisionCrudConceptosPage;