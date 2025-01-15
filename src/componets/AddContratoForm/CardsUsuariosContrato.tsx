import React from 'react'
import { Grid } from '@mui/material'
import AddUserForm from '../AddUserForm'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import CardsUsuariosAsignacionContrato from './CardsUsuariosAsignacionContrato'
import SearchFiltro from '../SearchFiltro/SearchFiltro'
import { useCardsUsuariosContrato } from './useCardsUsuariosContrato'
import ModalComponent from '../Modal'
import './style.scss';

export interface CardsUsuariosContratoProps {
    onActionPerUser: (data: any) => void
    onActionUsersSeleccion: (data: any) => void
    onAction: (data: any) => void
    onFinish: () => void
    procesando: boolean
    onCancel: () => void
    darkMode: boolean
    usuarios: any[]
    obra: any
    contratoId: number
    esGestionDeContrato?: boolean
}

const CardsUsuariosContrato: React.FC<CardsUsuariosContratoProps> = (props: CardsUsuariosContratoProps) => {
    
    const {
        esNuevo,
        setEsNuevo,
        usersSeleccion,
        handleFiltro,
        usuariosMap,
        elementosOrden,
        handleOrden,
        setUsersSeleccion,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        resetForm,
        setResetForm,
        intl
    } = useCardsUsuariosContrato(props);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={props?.darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>

                    {esNuevo === 0 ? <Grid item xs={12} md={12} style={{ textAlign: 'center', paddingTop: '150px' }}>
                        <ButtonGroup>
                            <Button
                                variant="outline-primary"
                                disabled={props?.procesando}
                                onClick={(e: any) => {
                                    setEsNuevo(1);
                                }}
                            >
                                {intl.formatMessage({ id: 'add_contratos_card_usuario_contrato_nuevo_usuario' })}
                            </Button>
                            <Button
                                variant="outline-warning"
                                disabled={props?.procesando}
                                onClick={(e: any) => {
                                    setEsNuevo(2);
                                }}
                            >
                                {intl.formatMessage({ id: 'add_contratos_card_usuario_contrato_usuario_existente' })}
                            </Button>
                            <Button
                                variant="outline-danger"
                                disabled={props?.procesando}
                                onClick={(e: any) => {
                                    props?.onCancel();
                                }}
                            >
                                {intl.formatMessage({ id: 'general_cancelar' })}
                            </Button>
                        </ButtonGroup>
                    </Grid> : null}
                    {esNuevo === 1 ? <Grid item xs={12} md={12} style={{ textAlign: 'center' }}> <AddUserForm onReset={() => setResetForm(false)} resetForm={resetForm} moduloContrato contratoId={props?.contratoId} obra={props?.obra} procesando={props?.procesando} action={props?.onAction} /> </Grid> : null}
                    {esNuevo === 2 ?
                        <Grid item xs={12} md={12}><Grid container spacing={2} style={{ padding: '10px' }}>
                            <Grid item xs={4} md={4} style={{ textAlign: 'center' }}>{usersSeleccion?.length ? <Button style={{ position: 'relative', bottom: '4px' }} variant={!props?.darkMode ? 'outline-dark' : 'outline-light'} onClick={(e: any) => { props?.onActionUsersSeleccion(usersSeleccion) }}>{intl.formatMessage({ id: 'add_contratos_card_usuario_contrato_guardar_seleccion' })}</Button> : null}</Grid>
                            <Grid item xs={4} md={4} style={{ textAlign: 'center' }}>{!props?.esGestionDeContrato ? <Button style={{ position: 'relative', bottom: '4px' }} variant={!props?.darkMode ? 'outline-dark' : 'outline-light'} onClick={(e: any) => { props?.onFinish() }}>{intl.formatMessage({ id: 'add_contratos_card_usuario_contrato_terminar_proceso' })}</Button> : null}</Grid>
                            <Grid item xs={4} md={4} style={{ textAlign: 'center' }}><SearchFiltro onFiltro={handleFiltro} /></Grid>
                            {usuariosMap.length ? usuariosMap.map((s: any, key: any) => {
                                return (
                                    <Grid key={key} item xs={props?.esGestionDeContrato ? 12 : 4} md={props?.esGestionDeContrato ? 12 : 4} style={{ textAlign: 'center' }}>
                                        <Card>
                                            <CardsUsuariosAsignacionContrato
                                                elementosOrden={elementosOrden}
                                                onOrden={handleOrden}
                                                contratoId={props?.contratoId}
                                                obra={props?.obra}
                                                onCheck={(value, item) => {
                                                    if (value) {
                                                        const nuew: any = Object.assign([], usersSeleccion);
                                                        nuew.push(item);
                                                        setUsersSeleccion(nuew);
                                                    } else {
                                                        const nuew: any = Object.assign([], usersSeleccion);
                                                        setUsersSeleccion(nuew.filter((n: any) => n?.id !== item?.id));
                                                    }
                                                }}
                                                darkMode={props?.darkMode}
                                                usuario={s}
                                                procesando={props.procesando}
                                                enAccion={props?.onActionPerUser}
                                            />
                                        </Card>
                                    </Grid>
                                )
                            }) : <Grid item xs={12} md={12} style={{ textAlign: 'center', color: props?.darkMode ? '#fff' : '#1f283e' }}><h1>{intl.formatMessage({ id: 'general_sin_resultados' })}</h1></Grid>}
                        </Grid>
                        </Grid> : null}
                </Grid>
            </Grid>
            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <p>{mensajeAlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>
        </Grid>

    )
}

export default CardsUsuariosContrato