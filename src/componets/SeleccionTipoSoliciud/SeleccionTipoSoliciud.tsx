import React, { useState } from "react";
import { Card, CardActionArea, CardContent, Typography, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";

interface SeleccionTipoSoliciudProps {
    tipos: any
    seleccionId: any
    seleccion: (tipo: any) => void
}

const SeleccionTipoSoliciud: React.FC<SeleccionTipoSoliciudProps> = (props: SeleccionTipoSoliciudProps) => {

    return (
        <Box display="flex" justifyContent="center" gap={3} mt={3}>
            <Grid container spacing={2}>


                {props?.tipos.map((type: any) => (
                    <Grid item xs={12} md={2}>
                    <motion.div
                        key={type.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Card
                            sx={{
                                width: 250,
                                borderRadius: 3,
                                transition: "0.3s",
                                boxShadow: props?.seleccionId === type.id ? 8 : 2,
                                border: props?.seleccionId === type.id ? "2px solid #1976d2" : "none",
                            }}
                            onClick={() => {
                                props?.seleccion(type)
                            }}
                        >
                            
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {type.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {type.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}



export default SeleccionTipoSoliciud;