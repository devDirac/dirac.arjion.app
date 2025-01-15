import React from 'react'
import env from "react-dotenv";
import type { DetalleConceptoCatalogoProps } from './types'
import { Divider, Grid, Menu, MenuItem } from '@mui/material'
import './style.scss'
import BillingInformation from '../../layouts/ecommerce/orders/order-details/components/BillingInformation'
import moment from 'moment'
import { Button, ButtonGroup } from 'react-bootstrap';
import { numericFormatter } from 'react-number-format';

const DetalleConceptoCatalogo: React.FC<DetalleConceptoCatalogoProps> = (props: DetalleConceptoCatalogoProps) => {

    const [anchorElFotos, setAnchorElFotos] = React.useState<null | HTMLElement>(null);
    const openFotos = Boolean(anchorElFotos);
    const handleClickFotos = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElFotos(event.currentTarget);
    };
    const handleCloseFotos = () => {
        setAnchorElFotos(null);
    };


    const [anchorElVideos, setAnchorElVideos] = React.useState<null | HTMLElement>(null);
    const openVideos = Boolean(anchorElVideos);
    const handleClickVideos = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElVideos(event.currentTarget);
    };
    const handleCloseVideos = () => {
        setAnchorElVideos(null);
    };


    const [anchorElAudios, setAnchorElAudios] = React.useState<null | HTMLElement>(null);
    const openAudios = Boolean(anchorElAudios);
    const handleClickAudios = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElAudios(event.currentTarget);
    };
    const handleCloseAudios = () => {
        setAnchorElAudios(null);
    };

    const [anchorElNotas, setAnchorElNotas] = React.useState<null | HTMLElement>(null);
    const openNotas = Boolean(anchorElNotas);
    const handleClickNotas = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElNotas(event.currentTarget);
    };
    const handleCloseNotas = () => {
        setAnchorElNotas(null);
    };

    const [anchorElDocumentos, setAnchorElDocumentos] = React.useState<null | HTMLElement>(null);
    const openDocumentos = Boolean(anchorElDocumentos);
    const handleClickDocumentos = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElDocumentos(event.currentTarget);
    };
    const handleCloseDocumentos = () => {
        setAnchorElDocumentos(null);
    };

    return (
        <Grid
            container
            p={1}
            className={!props?.enAvance ? "container-main" : ""}
        >
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    className="bordersContainers"
                    style={
                        props?.darkMode
                            ? {
                                backgroundColor: "#1f283e",
                                padding: "10px",
                            }
                            : {
                                backgroundColor: "#fff",
                                padding: "10px",
                            }
                    }
                >
                    <h5>Detalle del concepto</h5>
                    <BillingInformation
                        title={"Concepto"}
                        itemsToshow={[
                            { label: "ID concepto", value: props?.concepto?.concepto },
                            { label: "", value: props?.concepto?.descripcion },
                            { label: "ID auxiliar", value: props?.concepto?.inciso },
                            {
                                label: "Número de convenio",
                                value: props?.concepto?.detalleToEdit?.[0]?.num_convenio,
                            },
                            {
                                label: "Fecha de registro",
                                value: moment(
                                    props?.concepto?.fecha_hoy || new Date()
                                ).format("MMMM DD YYYY"),
                            },
                            {
                                label: "Fecha de inicio",
                                value: moment(
                                    props?.concepto?.fecha_inicio || new Date()
                                ).format("MMMM DD YYYY"),
                            },
                            {
                                label: "Fecha de terminación",
                                value: moment(
                                    props?.concepto?.fecha_fin || new Date()
                                ).format("MMMM DD YYYY"),
                            },
                            { label: "Unidad", value: props?.concepto?.unidad },
                            { label: "Cantidad", value: props?.concepto?.cantidad },

                            {
                                label: "PU",
                                value: numericFormatter((props?.concepto?.pu || 0) + "", {
                                    thousandSeparator: ",",
                                    decimalScale: 2,
                                    fixedDecimalScale: true,
                                    prefix: "$",
                                }),
                            },
                            {
                                label: "Importe",
                                value: numericFormatter(
                                    (+props?.concepto?.cantidad || 0) *
                                    (+props?.concepto?.pu || 0) +
                                    "",
                                    {
                                        thousandSeparator: ",",
                                        decimalScale: 2,
                                        fixedDecimalScale: true,
                                        prefix: "$",
                                    }
                                ),
                            },
                            {
                                label: "Acumulado",
                                value: numericFormatter(
                                    (+props?.concepto?.acumulado || 0) + "",
                                    {
                                        thousandSeparator: ",",
                                        decimalScale: 2,
                                        fixedDecimalScale: true,
                                        suffix: " " + props?.concepto?.unidad,
                                    }
                                ),
                            },
                            {
                                label: "Avance",
                                value: numericFormatter(
                                    (+props?.concepto?.avance || 0) + "",
                                    {
                                        thousandSeparator: ",",
                                        decimalScale: 2,
                                        fixedDecimalScale: true,
                                        suffix: "%",
                                    }
                                ),
                            },
                        ]}
                    />
                </Grid>
                <Divider />
                <Grid item xs={12} md={12} style={{ textAlign: "left" }}>
                    <ButtonGroup>
                        <Button variant="outline-primary" aria-controls={openFotos ? 'basic-menu-foto' : undefined} aria-haspopup="true" aria-expanded={openFotos ? 'true' : undefined} onClick={handleClickFotos}>
                            Foto({props?.concepto?.fotos?.length || 0})
                        </Button>
                        <Menu
                            id="basic-menu-foto"
                            anchorEl={anchorElFotos}
                            open={openFotos}
                            onClose={handleCloseFotos}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                                props?.concepto?.fotos?.length ? props?.concepto?.fotos?.map((foto: any) => {
                                    return (
                                        <MenuItem key={foto?.id || ''}>
                                            <a
                                                target="_blank"
                                                onClick={handleCloseFotos}
                                                href={`${env.API_URL_DOCUMENTOS}/${foto?.ruta || ""}`}>
                                                {foto?.nombre}
                                            </a>
                                        </MenuItem>);
                                }) : <MenuItem>Sin fotos</MenuItem>
                            }
                        </Menu>

                        <Button variant="outline-primary" aria-controls={openVideos ? 'basic-menu-video' : undefined} aria-haspopup="true" aria-expanded={openVideos ? 'true' : undefined} onClick={handleClickVideos}>
                            Video({props?.concepto?.videos?.length || 0})
                        </Button>
                        <Menu
                            id="basic-menu-video"
                            anchorEl={anchorElVideos}
                            open={openVideos}
                            onClose={handleCloseVideos}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                                props?.concepto?.videos?.length ? props?.concepto?.videos?.map((video: any) => {
                                    return (
                                        <MenuItem key={video?.id || ''}>
                                            <a
                                                target="_blank"
                                                onClick={handleCloseVideos}
                                                href={`${env.API_URL_DOCUMENTOS}/${video?.ruta || ""}`}>
                                                {video?.nombre}
                                            </a>
                                        </MenuItem>);
                                }) : <MenuItem>Sin videos</MenuItem>
                            }
                        </Menu>


                        <Button variant="outline-primary" aria-controls={openAudios ? 'basic-menu-audio' : undefined} aria-haspopup="true" aria-expanded={openAudios ? 'true' : undefined} onClick={handleClickAudios}>
                            Audio({props?.concepto?.audios?.length || 0})
                        </Button>
                        <Menu
                            id="basic-menu-audio"
                            anchorEl={anchorElAudios}
                            open={openAudios}
                            onClose={handleCloseAudios}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                                props?.concepto?.audios?.length ? props?.concepto?.audios?.map((audio: any) => {
                                    return (
                                        <MenuItem key={audio?.id || ''}>
                                            <a
                                                target="_blank"
                                                onClick={handleCloseAudios}
                                                href={`${env.API_URL_DOCUMENTOS}/${audio?.ruta || ""}`}>
                                                {audio?.nombre}
                                            </a>
                                        </MenuItem>);
                                }) : <MenuItem>Sin audios</MenuItem>
                            }
                        </Menu>


                        <Button variant="outline-primary" aria-controls={openNotas ? 'basic-menu-notas' : undefined} aria-haspopup="true" aria-expanded={openNotas ? 'true' : undefined} onClick={handleClickNotas}>
                            Notas({props?.concepto?.notas?.length || 0})
                        </Button>

                        <Menu
                            id="basic-menu-notas"
                            anchorEl={anchorElNotas}
                            open={openNotas}
                            onClose={handleCloseNotas}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                                props?.concepto?.notas?.length ? props?.concepto?.notas?.map((nota: any) => {
                                    return (
                                        <MenuItem key={nota?.id || ''}>

                                            {nota?.titulo + ' - ' + nota?.nota}

                                        </MenuItem>);
                                }) :  <MenuItem>Sin notas</MenuItem>
                            }
                        </Menu>



                        <Button variant="outline-primary" aria-controls={openDocumentos ? 'basic-menu-documentos' : undefined} aria-haspopup="true" aria-expanded={openDocumentos ? 'true' : undefined} onClick={handleClickDocumentos}>
                            Documentos({props?.concepto?.documentos?.length || 0})
                        </Button>
                        <Menu
                            id="basic-menu-documentos"
                            anchorEl={anchorElDocumentos}
                            open={openDocumentos}
                            onClose={handleCloseDocumentos}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                                props?.concepto?.documentos?.length ? props?.concepto?.documentos?.map((documento: any) => {
                                    return (
                                        <MenuItem key={documento?.id || ''}>

                                            <a
                                                target="_blank"
                                                onClick={handleCloseDocumentos}
                                                href={`${env.API_URL_DOCUMENTOS}/${documento?.ruta || ""}`}>
                                                {documento?.nombre}
                                            </a>

                                        </MenuItem>);
                                }) : <MenuItem>Sin documentos</MenuItem>
                            }
                        </Menu>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} md={12} style={{ textAlign: "left" }}>
                    {props?.concepto?.estatusNumero === 4 ? (
                        <p style={{ fontWeight: 400, color: "#ff3333" }}>
                            Para iniciar el proceso de aprobación es necesario adjuntar el
                            análisis de Precio Unitario{" "}
                            <label
                                style={{
                                    fontWeight: "bold",
                                    color: "#0d6efd",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    props?.enAccion &&
                                        props?.enAccion("analisis_pu", props?.concepto);
                                }}
                            >
                                Oprima aquí para continuar
                            </label>
                        </p>
                    ) : (
                        <></>
                    )}
                    {props?.concepto?.estatusNumero === 3 ? (
                        <p style={{ fontWeight: 400, color: "#ff3333" }}>
                            Para continuar se requiere del dictamen del precio unitario{" "}
                            <label
                                style={{
                                    fontWeight: "bold",
                                    color: "#0d6efd",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    props?.enAccion &&
                                        props?.enAccion("dictamen_pu", props?.concepto);
                                }}
                            >
                                Oprima aqui para continuar
                            </label>{" "}
                        </p>
                    ) : (
                        <></>
                    )}
                    {props?.concepto?.estatusNumero === 2 ? (
                        <p style={{ fontWeight: 400, color: "#ff3333" }}>
                            Para continuar se requiere del documento de autorización del
                            cliente{" "}
                            <label
                                style={{
                                    fontWeight: "bold",
                                    color: "#0d6efd",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    props?.enAccion &&
                                        props?.enAccion("autorizacion_cliente", props?.concepto);
                                }}
                            >
                                Oprima aqui para continuar
                            </label>{" "}
                        </p>
                    ) : (
                        <></>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DetalleConceptoCatalogo
