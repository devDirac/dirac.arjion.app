import { Grid } from '@mui/material'
import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import './style.scss';

interface AsignarUsuariosPreguntaProps {
    darkMode: boolean
    procesando: boolean
    onSeleccion: (tipo: number) => void
}

const AsignarUsuariosPregunta: React.FC<AsignarUsuariosPreguntaProps> = (props: AsignarUsuariosPreguntaProps) => {
    const intl = useIntl();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={props?.darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>
                    <Grid item xs={12} md={12} style={{textAlign:'center', minHeight:'120px', paddingBottom:'60px', paddingTop:'60px'}}>
                        <h1 style={{color:props?.darkMode ?'#fff' : '#344767'}}>{intl.formatMessage({ id: 'add_contratos_pregunta' })}</h1>
                    </Grid>
                    <Grid item xs={12} md={12} style={{textAlign:'center'}}>
                        <ButtonGroup>
                            <Button
                                variant="outline-primary"
                                disabled={props?.procesando}
                                onClick={(e: any) => {
                                    props?.onSeleccion(1);
                                }}
                            >
                                {intl.formatMessage({ id: 'add_contratos_pregunta_respuesta_1' })}
                            </Button>
                            <Button
                                variant="outline-warning"
                                disabled={props?.procesando}
                                onClick={(e: any) => {
                                    props?.onSeleccion(0);
                                }}
                            >
                                {intl.formatMessage({ id: 'add_contratos_pregunta_respuesta_2' })}
                            </Button>
                        </ButtonGroup>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}

export default AsignarUsuariosPregunta
