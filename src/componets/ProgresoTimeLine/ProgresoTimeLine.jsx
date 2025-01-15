import { Grid } from '@mui/material'
import TimelineList from "../../examples/Timeline/TimelineList";
import TimelineItem from "../../examples/Timeline/TimelineItem";
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import StoreIcon from '@mui/icons-material/Store';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import PaymentsIcon from '@mui/icons-material/Payments';
import GradeIcon from '@mui/icons-material/Grade';
import './styles.scss';
import useProgresoTimeLine from './useProgresoTimeLine';
const ProgresoTimeLine = (props) => {
    const {
        contrato,
        handleSelectParametros,
        handleUsuarios,
        handleAsignacionPEP,
        handleAsignacionClasificacion,
        handleFrentes,
        handleCatalogoConceptos,
        handleProgramaFinanciero
    } = useProgresoTimeLine(props)
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <TimelineList title={`Integridad de la parametrización del contrato: ${contrato?.contrato}`} subtitle={'Completa este avance para obtener mejores resultados '}>
                    <TimelineItem
                        elemento={{ id: 1 }}
                        onSelec={() => { }}
                        color="success"
                        icon={<EditNoteIcon />}
                        title="Creación del contrato"
                        dateTime={`${contrato?.fecha_registro}`}
                        description={`El contrato ${contrato?.contrato} fue creado`}
                    />
                    <TimelineItem
                        elemento={{ id: 2 }}
                        onSelec={() => handleSelectParametros(contrato?.id)}
                        color={contrato?.estatus_parametro === null ? "error" : 'info'}
                        icon={<SettingsIcon />}
                        title={`Parámetros del contrato ${contrato?.estatus_parametro === null ? '- obligatorio' : ''}`}
                        dateTime={`${contrato?.estatus_parametro === null ? '' : contrato?.fecha_registro_parametro}`}
                        description={`${contrato?.estatus_parametro === null ? 'Asigne los parametros del sistema dando clic aquí es un proceso requerido' : 'Se asignarón los parametros del contrato si deseas cambiarlos da clic aquí '}`}
                    />
                    <TimelineItem
                        elemento={{ id: 3 }}
                        onSelec={() => handleUsuarios(contrato?.id)}
                        color={`${contrato?.usuarios_asignados <= 1 ? 'warning' : 'info'}`}
                        icon={<GroupIcon />}
                        title={`Asignación de usuarios ${contrato?.usuarios_asignados <= 1 ? '- obligatorio' : ''}`}
                        dateTime={`${contrato?.usuarios_asignados === 1 ? '' : contrato?.usuarios_asignados !== 0 ? 'Entre las fechas' : ''} ${contrato?.usuarios_asignados > 0 ? contrato?.fecha_usuarios_asignados : ''}`}
                        description={`Se ${contrato?.usuarios_asignados > 1 ? 'asignarón' : 'asigno'} ${contrato?.usuarios_asignados} usuario${contrato?.usuarios_asignados > 1 ? 's' : ''} a este contrato, si desea agregar mas usuarios de clic aquí`}
                    />
                    <TimelineItem
                        elemento={{ id: 4 }}
                        onSelec={() => handleAsignacionPEP(contrato?.id)}
                        color={contrato?.pep === null ? "light" : 'info'}
                        icon={<AccountBalanceWalletIcon />}
                        title="Asignación de cuentas contables"
                        dateTime={`${contrato?.pep === null ? '' : contrato?.pep_fecha_registro}`}
                        description={`${contrato?.pep !== null ? 'Se asigno la cuenta (' + contrato?.pep_nombre + ') al contrato, si deseas editar la cuenta contable da clic aquí' : 'Para asignar una cuenta contable de clic aquí'}`}
                    />
                    <TimelineItem
                        elemento={{ id: 5 }}
                        onSelec={() => handleAsignacionClasificacion(contrato?.id)}
                        color={contrato?.clasificacion_contrato === null ? "light" : 'info'}
                        icon={<BookmarksIcon />}
                        title="Asignación de la clasificación"
                        dateTime={`${contrato?.clasificacion_contrato === null ? '' : contrato?.clasificacion_contrato_fecha_registro}`}
                        description={`${contrato?.clasificacion_contrato !== null ? 'Se asigno la clasificación (' + contrato?.nombre_clasificacion_contrato + ') al contrato, si deseas editar la caslificación da clic aquí ' : 'Para asignar una clasificación de clic aquí'} `}
                    />

                    <TimelineItem
                        elemento={{ id: 5 }}
                        onSelec={() => handleAsignacionClasificacion(contrato?.id)}
                        color={contrato?.id_especialidad === null ? "light" : 'info'}
                        icon={<GradeIcon />}
                        title="Asignación de la especialidad"
                        dateTime={`${contrato?.id_especialidad === null ? '' : contrato?.id_especialidad_fecha_registro}`}
                        description={`${contrato?.id_especialidad !== null ? 'Se asigno la especialidad (' + contrato?.nombre_especialidad_contrato + ') al contrato, si deseas editar la especialidad da clic aquí ' : 'Para asignar una especialidad de clic aquí'} `}
                    />

                    <TimelineItem
                        elemento={{ id: 6 }}
                        onSelec={() => contrato?.frentes === null ? handleFrentes() : null}
                        color={contrato?.frentes === null ? "error" : 'info'}
                        icon={<StoreIcon />}
                        title={`Carga del catalogo de frentes ${contrato?.frentes === null ? '- obligatorio' : ''}`}
                        dateTime={`${contrato?.frentes === null ? '' : contrato?.frentes_fecha_registro}`}
                        description={`${contrato?.frentes === null ? 'Para cargar el catalogo de frentes de clic aquí' : 'Se cargo el catalogo de frentes'}`}
                    />
                    <TimelineItem
                        elemento={{ id: 7 }}
                        onSelec={() => contrato?.catalogo_conceptos === null ? handleCatalogoConceptos : null}
                        color={contrato?.catalogo_conceptos === null ? "error" : 'info'}
                        icon={<FeaturedPlayListIcon />}
                        title={`Carga del catalogo de conceptos ${contrato?.catalogo_conceptos === null ? '- obligatorio' : ''}`}
                        dateTime={`${contrato?.catalogo_conceptos === null ? '' : contrato?.catalogo_conceptos_fecha_registro}`}
                        description={`${contrato?.catalogo_conceptos === null ? 'Para cargar el catalogo de conceptos de clic aquí' : 'Se cargo el catalogo de conceptos'}`}
                    />
                    <TimelineItem
                        elemento={{ id: 8 }}
                        onSelec={() => contrato?.programa_financiero === null ? handleProgramaFinanciero() : null}
                        color={contrato?.programa_financiero === null ? "light" : 'info'}
                        icon={<PaymentsIcon />}
                        title="Carga del programa financiero"
                        dateTime={`${contrato?.programa_financiero === null ? '' : contrato?.programa_financiero_fecha_registro}`}
                        description={`${contrato?.programa_financiero === null ? 'Para cargar el programa financiero de clic aquí' : 'Se cargo el programa financiero'}`}
                        lastItem
                    />

                </TimelineList>
            </Grid>
        </Grid>
    )
}

export default ProgresoTimeLine
