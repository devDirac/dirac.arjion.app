import { useState } from "react";
import { Card, CardContent, CardHeader, Typography, Button, Chip, Grid } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

interface Documento {
    nombre: string;
    tipo: "pdf" | "word" | "xml";
    url: string;
}

interface Solicitud {
    id: number;
    tipo: string;
    gasto: number;
    descripcion: string;
    fecha: string;
    estatus: number;
    
    documentos: Documento[];
}

const statusLabels: Record<number, { label: string; color: "primary" | "warning" | "success" | "error" }> = {
    1: { label: "Creada", color: "primary" },
    2: { label: "En revisión", color: "warning" },
    3: { label: "Aprobada", color: "success" },
    4: { label: "Rechazada", color: "error" },
    5: { label: "Liberada", color: "success" },
};

interface SolicitudCardProps {
    solicitud: Solicitud;
    regresar: () => void
    verBitacora: (e: any) => void
}

const SolicitudCard: React.FC<SolicitudCardProps> = ({ solicitud, regresar, verBitacora }) => {

    const [estatus, setEstatus] = useState<number>(solicitud?.estatus ?? 1);

    const handleViewDocument = (doc: Documento) => {
        window.open(doc.url, "_blank");
    };

    return (
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
            <CardHeader title={`Solicitud #${solicitud?.id || 0}`} subheader={solicitud?.fecha || ''} />
            <CardContent>
                <Typography variant="body1"><strong>Tipo:</strong> {solicitud?.tipo || ''}</Typography>
                <Typography variant="body1"><strong>Gasto a comprobar:</strong> ${solicitud?.gasto || ''}</Typography>
                <Typography variant="body1"><strong>Descripción:</strong> {solicitud?.descripcion || ''}</Typography>
                <Chip label={statusLabels[estatus]?.label || "Desconocido"} color={statusLabels[estatus]?.color || "default"} sx={{ mt: 1 }} />
                <Typography onClick={() => {
                    verBitacora(solicitud)
                }} style={{ cursor: 'pointer' }} variant="body1"><strong>Ver bitacora:</strong> <VisibilityIcon color="info" sx={{ ml: 1 }} /> </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>Documentos:</Typography>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                    {solicitud.documentos.map((doc, index) => (
                        <Grid item key={index}>
                            <Button
                                variant="outlined" size="small" style={{ color: '#1976d2' }}
                                startIcon={doc.tipo === "pdf" ? <PictureAsPdfIcon /> : <InsertDriveFileIcon />}
                                onClick={() => handleViewDocument(doc)}
                            >
                                {doc.nombre}
                                <VisibilityIcon sx={{ ml: 1 }} />
                            </Button>
                        </Grid>
                    ))}
                    <Grid item xs={12} style={{ textAlign: 'right' }} >
                        <Button
                            variant="outlined" size="small" style={{ color: '#1976d2' }}
                            onClick={() => regresar()}
                        >
                            <ReplyAllIcon fontSize="large" color="info"/>
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SolicitudCard;