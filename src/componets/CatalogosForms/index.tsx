import React from 'react'
import type CatalogosFormsProps from './types'
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, CircularProgress, Grid } from '@mui/material'
import SelectField from '../SelectField'
import { FormikProvider } from 'formik'
import { Form } from 'react-bootstrap';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import _ from 'lodash'
import DinamicTable from '../DinamicTable'
import ModalComponent from '../Modal'
import CatalogoEspecialidades from './CatalogoEspecialidades'
import CatalogoEspecialidadesDocumento from './CatalogoEspecialidadesDocumento'
import CatalogoContratistas from './CatalogoContratistas'
import CatalogoEquipoMaquinaria from './CatalogoEquipoMaquinaria'
import CatalogoObras from './CatalogoObras'
import CatalogoPEP from './CatalogoPEP'
import CatalogoTipoConcepto from './CatalogoTipoConcepto'
import CatalogoMoneda from './CatalogoMoneda'
import CatalogoTipoAcance from './CatalogoTipoAcance'
import CatalogosGenericos from './CatalogosGenericos'
import CatalogoTipoContrato from './CatalogoTipoContrato'
import CatalogoPerfilesCliente from './CatalogoPerfilesCliente'
import useCatalogosForms from './useCatalogosForms'
import ModalConfirm from '../ModalConfirm/ModalConfirm'
import './style.scss';

const CatalogosForms: React.FC<CatalogosFormsProps> = (props: CatalogosFormsProps) => {
    
    const {
        darkMode,
        formik,
        tipoCatalogo,
        tiposCatalogos,
        handleSeleccionCatalogo,
        catalogoSeleccionado,
        guardaCatalogo,
        procesando,
        guardaCatalogoEspecialidades,
        guardaCatalogoSubEspecialidades,
        guardaCatalogoContratistas,
        guardaCatalogoEquipoMaquinarias,
        guardaCatalogoObra,
        guardaCataPEP,
        guardaCatalogoTipoConcepto,
        guardaCatalogoMoneda,
        guardaCatalogoTipoAvance,
        guardaCatalogoTipoContrato,
        guardaCatalogoPerfilCliente,
        handleClose,
        isOpen,
        editaElementoCatalogo,
        itemCatalogoDetalle,
        editaElementoCatalogoEspecialidad,
        editaCatalogoSubEspecialidades,
        editaCatalogoContratistas,
        actualizaCatalogoEquipoMaquinaria,
        actualizaCatalogoObra,
        actualizaCatalPEP,
        actualizaCatalogoTipoConcepto,
        actualizaCatalogoMoneda,
        actualizaCatalogoTipoAvance,
        actualizaCatalogoTipoContrato,
        actualizaCatalogoTipoCliente,
        dataSeleccionCatalogo,
        actualizarElementoCatalogo,
        actualizarElementoCatalogoPregunta,
        eliminaElementoCatalogo,
        eliminaElementoCatalogoPregunta,
        reactivarElementoCatalogoPregunta,
        reactivarElementoCatalogo,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        setOpenModalConfirmDelete,
        setTextModalConfirmDelete,
        openModalConfirmDelete,
        textModalConfirmDelete,
        setOpenModalConfirmActualizar,
        setTextModalConfirmActualizar,
        openModalConfirmActualizar,
        textModalConfirmActualizar,
        setOpenModalConfirmReactivar,
        setTextModalConfirmReactivar,
        openModalConfirmReactivar,
        textModalConfirmReactivar,
        intl,
        peps
    } = useCatalogosForms(props);
    return (
        <Grid container className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px' } : { backgroundColor: '#fff', padding: '10px' }}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3  ">
                        <SelectField
                            label={intl.formatMessage({ id: 'input_tipo_catalogo' })}
                            value={tipoCatalogo}
                            options={tiposCatalogos}
                            name="tipoCatalogo"
                            id="tipoCatalogo"
                            required
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("tipoCatalogo", target?.value || '');
                                handleSeleccionCatalogo(target?.value || '');
                            }}
                            formik={formik?.getFieldMeta('tipoCatalogo')}
                        />
                    </Form.Group>
                </FormikProvider>
            </Grid>
            {!_.isEmpty(catalogoSeleccionado) ? <Grid item xs={12}>
                <Accordion style={darkMode ? { backgroundColor: 'transparent', border: 'solid 1px grey' } : {}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={darkMode ? { textAlign: 'center', color: 'white' } : { textAlign: 'center' }}
                    >
                        {intl.formatMessage({ id: 'catalogo_formulario_principal_acordion_1' })} {catalogoSeleccionado ? '(' + (catalogoSeleccionado?.label || '') + ')' : ''}
                    </AccordionSummary>
                    <AccordionDetails>
                        {catalogoSeleccionado?.esgenerico ?
                            <CatalogosGenericos key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogo} procesando={procesando} /> :
                            !catalogoSeleccionado ?
                                null :
                                catalogoSeleccionado?.value === 'apm_cat_especialidades' ?
                                    <CatalogoEspecialidades key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogoEspecialidades} procesando={procesando} /> :
                                    catalogoSeleccionado?.value === 'apm_cat_especialidades_documentos' ?
                                        <CatalogoEspecialidadesDocumento key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogoSubEspecialidades} procesando={procesando} /> :
                                        catalogoSeleccionado?.value === 'apm_contratistas' ?
                                            <CatalogoContratistas key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogoContratistas} procesando={procesando} /> :
                                            catalogoSeleccionado?.value === 'apm_equipo_maquinaria' ?
                                                <CatalogoEquipoMaquinaria key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogoEquipoMaquinarias} procesando={procesando} /> :
                                                catalogoSeleccionado?.value === 'apm_obras' ?
                                                    <CatalogoObras key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogoObra} procesando={procesando} /> :
                                                    catalogoSeleccionado?.value === 'apm_pep' ?
                                                        <CatalogoPEP key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCataPEP} procesando={procesando} peps={peps} /> :
                                                        catalogoSeleccionado?.value === 'apm_cat_tipo_concepto' ?
                                                            <CatalogoTipoConcepto key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogoTipoConcepto} procesando={procesando} /> :
                                                            catalogoSeleccionado?.value === 'apm_cat_moneda' ?
                                                                <CatalogoMoneda key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogoMoneda} procesando={procesando} /> :
                                                                catalogoSeleccionado?.value === 'apm_cat_tipo_avance' ?
                                                                    <CatalogoTipoAcance key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogoTipoAvance} procesando={procesando} /> :

                                                                    catalogoSeleccionado?.value === 'apm_cat_tipo_contrato' ?
                                                                        <CatalogoTipoContrato key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogoTipoContrato} procesando={procesando} /> :

                                                                        catalogoSeleccionado?.value === 'apm_cat_perfiles_cliente' ?
                                                                            <CatalogoPerfilesCliente key={'agregaNuevo'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={guardaCatalogoPerfilCliente} procesando={procesando} /> :

                                                                            null}
                    </AccordionDetails>
                </Accordion>
                <Accordion style={darkMode ? { backgroundColor: 'transparent', border: 'solid 1px grey' } : {}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        style={darkMode ? { textAlign: 'center', color: 'white' } : { textAlign: 'center' }}
                    >
                        {intl.formatMessage({ id: 'catalogo_formulario_principal_acordion_2' })}
                    </AccordionSummary>
                    <AccordionDetails>
                        {!_.isEmpty(dataSeleccionCatalogo) ? <DinamicTable
                            key={'idTable'}
                            columnsToShow={['clave', 'descripcion', 'fecha_registro', 'id', 'id_estatus', 'nombre', 'proyecto', 'usuario_alta']}
                            enAccion={(accion, detalle) => {
                                switch (accion) {
                                    case 'editar':
                                        const nuewToEdit = { ...detalle, ...detalle.hasOwnProperty('id_estatus') ? { id_estatus: detalle?.id_estatus === 'Activo' ? 1 : 2 } : {} }
                                        actualizarElementoCatalogoPregunta(nuewToEdit);
                                        break;
                                    case 'eliminar':
                                        eliminaElementoCatalogoPregunta(detalle);
                                        break;
                                    case 'reactivar':
                                        reactivarElementoCatalogoPregunta(detalle);
                                        break;
                                    default:
                                        break;
                                }
                            }}
                            actions
                            data={dataSeleccionCatalogo}
                            titulo={catalogoSeleccionado?.label}
                        /> : null}
                    </AccordionDetails>
                </Accordion>
            </Grid> : null}
            <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={procesando}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalComponent handleClose={handleClose} isOpen={isOpen}>
                {catalogoSeleccionado?.esgenerico ?
                    <CatalogosGenericos key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={editaElementoCatalogo} procesando={procesando} item={itemCatalogoDetalle} /> :
                    !catalogoSeleccionado ?
                        null :
                        catalogoSeleccionado?.value === 'apm_cat_especialidades' ?
                            <CatalogoEspecialidades key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={editaElementoCatalogoEspecialidad} procesando={procesando} item={itemCatalogoDetalle} /> :
                            catalogoSeleccionado?.value === 'apm_cat_especialidades_documentos' ?
                                <CatalogoEspecialidadesDocumento key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={editaCatalogoSubEspecialidades} procesando={procesando} item={itemCatalogoDetalle} /> :
                                catalogoSeleccionado?.value === 'apm_contratistas' ?
                                    <CatalogoContratistas key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={editaCatalogoContratistas} procesando={procesando} item={itemCatalogoDetalle} /> :
                                    catalogoSeleccionado?.value === 'apm_equipo_maquinaria' ?
                                        <CatalogoEquipoMaquinaria key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={actualizaCatalogoEquipoMaquinaria} procesando={procesando} item={itemCatalogoDetalle} /> :
                                        catalogoSeleccionado?.value === 'apm_obras' ?
                                            <CatalogoObras key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={actualizaCatalogoObra} procesando={procesando} item={itemCatalogoDetalle} /> :
                                            catalogoSeleccionado?.value === 'apm_pep' ?
                                                <CatalogoPEP key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={actualizaCatalPEP} procesando={procesando} item={itemCatalogoDetalle} peps={peps} /> :
                                                catalogoSeleccionado?.value === 'apm_cat_tipo_concepto' ?
                                                    <CatalogoTipoConcepto key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={actualizaCatalogoTipoConcepto} procesando={procesando} item={itemCatalogoDetalle} /> :
                                                    catalogoSeleccionado?.value === 'apm_cat_moneda' ?
                                                        <CatalogoMoneda key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={actualizaCatalogoMoneda} procesando={procesando} item={itemCatalogoDetalle} /> :
                                                        catalogoSeleccionado?.value === 'apm_cat_tipo_avance' ?
                                                            <CatalogoTipoAcance key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={actualizaCatalogoTipoAvance} procesando={procesando} item={itemCatalogoDetalle} /> :

                                                            catalogoSeleccionado?.value === 'apm_cat_tipo_contrato' ?
                                                                <CatalogoTipoContrato key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={actualizaCatalogoTipoContrato} procesando={procesando} item={itemCatalogoDetalle} /> :

                                                                catalogoSeleccionado?.value === 'apm_cat_perfiles_cliente' ?
                                                                    <CatalogoPerfilesCliente key={'actualizaItem'} catalogo={tipoCatalogo} titulo={catalogoSeleccionado?.label} action={actualizaCatalogoTipoCliente} procesando={procesando} item={itemCatalogoDetalle} /> :

                                                                    'FORMULARIO UNICO'}
            </ModalComponent>
            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <p>{mensajeAlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>
            <ModalConfirm key={'Delete'} onAcept={() => {
                eliminaElementoCatalogo();
            }} onCancel={() => {
                setOpenModalConfirmDelete(false);
                setTextModalConfirmDelete('');
            }} open={openModalConfirmDelete} text={textModalConfirmDelete} title={''} />
            <ModalConfirm key={'Actualiar'} onAcept={() => {
                actualizarElementoCatalogo();
                setOpenModalConfirmActualizar(false);
                setTextModalConfirmActualizar('');
            }} onCancel={() => {
                setOpenModalConfirmActualizar(false);
                setTextModalConfirmActualizar('');
            }} open={openModalConfirmActualizar} text={textModalConfirmActualizar} title={''} />
            <ModalConfirm key={'Reactivar'} onAcept={() => {
                reactivarElementoCatalogo();
            }} onCancel={() => {
                setOpenModalConfirmReactivar(false);
                setTextModalConfirmReactivar('');
            }} open={openModalConfirmReactivar} text={textModalConfirmReactivar} title={''} />
        </Grid>
    )
}

export default CatalogosForms