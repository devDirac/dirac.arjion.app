import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Button, Divider } from "@mui/material";


interface Item {
    id: number;
    nombre: string;
}

interface TransferListProps {
    left_: Item[];
    right_: Item[];
    enguardar: (left: any, right: any) => void
}

const TransferList: React.FC<TransferListProps> = ({ enguardar, left_, right_ }) => {
    const [left, setLeft] = useState<Item[]>(left_);
    const [right, setRight] = useState<Item[]>(right_);

    // Sincronizar estado interno con cambios en las props
    useEffect(() => {
        setLeft(left_);
        setRight(right_);
    }, [left_, right_]);


    const handleTransfer = (
        item: Item,
        from: Item[],
        to: Item[],
        setFrom: React.Dispatch<React.SetStateAction<Item[]>>,
        setTo: React.Dispatch<React.SetStateAction<Item[]>>
    ) => {
        const newFrom = from.filter(i => i.id !== item.id);
        const newTo = [...to, item];
        setFrom(newFrom);
        setTo(newTo);
    };

    return (
        <div>
            <Box display="flex" justifyContent="center" gap={4}>
                <Card sx={{ width: 400, textAlign: "center" }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom style={{ color: 'rgb(68, 94, 150)' }}>
                            Disponibles
                        </Typography>
                        <List>
                            {left.map(item => (
                                <ListItem key={item.id} button onClick={() => handleTransfer(item, left, right, setLeft, setRight)}>
                                    <ListItemText style={{ color: 'rgb(68, 94, 150)' }} primary={item.nombre} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>

                <Card sx={{ width: 400, textAlign: "center" }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom style={{ color: 'rgb(68, 94, 150)' }}>
                            Seleccionados
                        </Typography>
                        <List>
                            {right.map(item => (
                                <ListItem key={item.id} button onClick={() => handleTransfer(item, right, left, setRight, setLeft)}>
                                    <ListItemText style={{ color: 'rgb(68, 94, 150)' }} primary={item.nombre} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>


            </Box>
            <Box display="flex" justifyContent="center" mt={4}>

                <Button onClick={() => {
                    enguardar(left, right)
                }}
                    size="small"
                    variant="outlined"
                    style={{ color: '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: '#fff' }}>
                    Guardar configuración
                </Button>
            </Box>
        </div>
    );
};

export default TransferList;
