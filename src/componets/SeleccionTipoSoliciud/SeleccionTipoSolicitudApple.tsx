import React from "react";
import { Card, CardActionArea, CardContent, Typography, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";

interface SeleccionTipoSolicitudAppleProps {
    tipos: { id: any; title: string; description: string; image: string }[];
    seleccionId: any;
    seleccion: (tipo: any) => void;
}

const SeleccionTipoSolicitudApple: React.FC<SeleccionTipoSolicitudAppleProps> = ({ tipos, seleccionId, seleccion }) => {
    return (
        <Box display="flex" justifyContent="center" gap={3} mt={3}>
            <Grid container spacing={3} justifyContent="center">
                {tipos.map((type) => (
                    <Grid item xs={12} sm={6} md={3} key={type.id}>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    position: "relative",
                                    boxShadow: seleccionId === type.id ? "0px 4px 15px rgba(0,0,0,0.5)" : "0px 2px 10px rgba(0,0,0,0.2)",
                                    border: seleccionId === type.id ? "2px solid #1976d2" : "none",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease-in-out",
                                }}
                                onClick={() => seleccion(type)}
                            >
                                <CardActionArea>
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: "100%",
                                            height: 130,
                                            backgroundColor:'#fff'
                                        }}
                                    />
                                    <CardContent sx={{ position: "absolute", bottom: 10, left: 10, color: "white" }}>
                                        <Typography variant="h6" fontWeight="bold" style={{fontSize:15}}>
                                            {type.title}
                                        </Typography>
                                        <Typography variant="body2" style={{fontSize:13}}>{type.description}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SeleccionTipoSolicitudApple;
