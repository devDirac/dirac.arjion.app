import React from 'react'
import "./styles.scss";
import SolicitanteScreen from '../screeens/SolicitanteScreen';
import { Box } from '@mui/material';
import { Container } from 'react-bootstrap';
const SolicitantePage: React.FC = () => (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
    <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
      <Container style={{ maxWidth: '1800px' }}>
        <SolicitanteScreen />
      </Container>
    </Box>
  </Box>
);
export default SolicitantePage;