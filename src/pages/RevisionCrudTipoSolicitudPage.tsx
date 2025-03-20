import React from 'react'
import "./styles.scss";
import RevisorCrudTipoSolicitudScreen from '../screeens/RevisorCrudTipoSolicitudScreen';
import { Box } from '@mui/material';
import { Container } from 'react-bootstrap';
const RevisionCrudTipoSolicitudPage: React.FC = () =>
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
            <Container style={{ maxWidth: '1800px' }}>
                <RevisorCrudTipoSolicitudScreen />
            </Container>
        </Box>
    </Box>;
export default RevisionCrudTipoSolicitudPage;