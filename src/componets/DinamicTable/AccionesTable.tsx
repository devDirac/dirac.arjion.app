import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DescriptionIcon from '@mui/icons-material/Description';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import LoupeIcon from '@mui/icons-material/Loupe';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import React from "react";
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import PinIcon from '@mui/icons-material/Pin';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import type { AccionesTableProps } from "./types";
import { useAccionesTable } from './useAccionesTable'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useIntl } from "react-intl";
import AddLinkIcon from '@mui/icons-material/AddLink';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EventIcon from '@mui/icons-material/Event';
import PreviewIcon from '@mui/icons-material/Preview';
import { useSelector } from "react-redux";
import SummarizeIcon from '@mui/icons-material/Summarize';
import './style.scss';
import { useMaterialUIController } from "context";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DvrIcon from '@mui/icons-material/Dvr';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SendIcon from '@mui/icons-material/Send';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const AccionesTable: React.FC<AccionesTableProps> = (
  props: AccionesTableProps
) => {
  const intl = useIntl();
  const [controller] = useMaterialUIController();
  const {
    darkMode
  } = controller;
  const esContratista = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 5);
  const esCoordinador = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 1);
  const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);
  const {
    anchorEl,
    handleClick,
    handleClose
  } = useAccionesTable(props);
  const esRevisor = useSelector((state: any) => state?.app?.user?.data?.perfiles_contratos || []).find((d: any) => d?.perfil === 'Revisor estimaciones');

  return (
    <div>
      <Button
        size="small"
        type="button"
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ color: 'white' }}
      >
        <DehazeIcon />
      </Button>
      <Menu
        id="simple-menu-user-options"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
      

        {
          props?.esContrato ?
            <MenuItem onClick={() => props?.enAccion("asignar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'tabla_dinamica_acciones_asignar_usuario' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <AddLinkIcon /> <small>{intl.formatMessage({ id: 'tabla_dinamica_acciones_asignar_usuario' })}</small>
              </IconButton>
            </MenuItem> :
            null
        }

        {
          props?.esContrato ?
            <MenuItem onClick={() => props?.enAccion("parametros")}>
              <IconButton aria-label={intl.formatMessage({ id: 'tabla_dinamica_acciones_parametros_contrato' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <DisplaySettingsIcon /> <small>{intl.formatMessage({ id: 'tabla_dinamica_acciones_parametros_contrato' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {(esCoordinador || esModoDios) && (!props?.esAvancePorConfirmar && !props?.esListaEstimacionesDefinitivas) && !props?.esMatriz && !props?.esDocumentoFrente && !props?.esEntradasSalidas && !props?.verDetalleNewDashbaord && !props?.accioesConsultaEstimaciones && !props?.proyectoCatalogoEliminarValores && !props?.accioesBitacoraEstimaciones && !props?.esUsuariosGeocerca && !props?.esGenerarPaquete ? <MenuItem onClick={() => props?.enAccion("editar")}>
          <IconButton aria-label={intl.formatMessage({ id: 'general_editar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
            <EditIcon /> <small>{intl.formatMessage({ id: 'general_editar' })}</small>
          </IconButton>
        </MenuItem> : null}


        {(esCoordinador || esModoDios) && (!props?.esAvancePorConfirmar && !props?.esListaEstimacionesDefinitivas) && props?.esMatriz && props?.row?.estatus !== 5 && !props?.verDetalleNewDashbaord && !props?.accioesConsultaEstimaciones && !props?.proyectoCatalogoEliminarValores && !props?.accioesBitacoraEstimaciones && !props?.esUsuariosGeocerca && !props?.esGenerarPaquete  && !props?.esGenerarPaquete ? <MenuItem onClick={() => props?.enAccion("editar")}>
          <IconButton aria-label={intl.formatMessage({ id: 'general_editar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
            <EditIcon /> <small>{intl.formatMessage({ id: 'general_editar' })}</small>
          </IconButton>
        </MenuItem> : props?.esMatriz ? <MenuItem disabled><IconButton disabled aria-label={intl.formatMessage({ id: 'general_editar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
          <EditIcon /> <small>{'Avance estimado'}</small>
        </IconButton></MenuItem> : null}


        {(esCoordinador || esModoDios) && (!props?.esAvancePorConfirmar && !props?.esListaEstimacionesDefinitivas) && props?.esMatriz && props?.row?.estatus !== 5 && !props?.verDetalleNewDashbaord && !props?.accioesConsultaEstimaciones && !props?.proyectoCatalogoEliminarValores && !props?.accioesBitacoraEstimaciones && !props?.esUsuariosGeocerca && !props?.esEdicionConceptos ? 
        <MenuItem onClick={() => props?.enAccion("eliminar")}>
          <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
            <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
          </IconButton> </MenuItem> :  null}


        {
          props?.row.hasOwnProperty('id_estatus') ? ((props?.row?.id_estatus === 'Activo') && !props?.esMatriz && !props?.esAvancePorConfirmar && !props?.esListaEstimacionesDefinitivas && !props?.verDetalleNewDashbaord && !props?.accioesConsultaEstimaciones ?
            <MenuItem onClick={() => props?.enAccion("eliminar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> : null) :
            props?.row.hasOwnProperty('activo') ? ((props?.row?.activo === 'Activo') && !props?.esMatriz && !props?.esAvancePorConfirmar && !props?.esListaEstimacionesDefinitivas ?
              <MenuItem onClick={() => props?.enAccion("eliminar")}>
                <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                  <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
                </IconButton>
              </MenuItem> : null) : props?.row.hasOwnProperty('estatus') ? (props?.row?.estatus === 'Activo' && !props?.esMatriz && !props?.esListaEstimacionesDefinitivas ?
                <MenuItem onClick={() => props?.enAccion("eliminar")}>
                  <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                    <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
                  </IconButton>
                </MenuItem> : null) :
              null
        }

        {
          props?.row.hasOwnProperty('id_estatus') ? (props?.row?.id_estatus !== 'Activo' && !props?.esMatriz && !props?.esAvancePorConfirmar && !props?.esListaEstimacionesDefinitivas && !props?.esHito && !props?.verDetalleNewDashbaord && !props?.accioesConsultaEstimaciones && !props?.proyectoCatalogoEliminarValores ?
            <MenuItem onClick={() => props?.enAccion("reactivar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_reactivar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <RefreshIcon /> <small>{intl.formatMessage({ id: 'general_reactivar' })}</small>
              </IconButton>
            </MenuItem> : null) : props?.row.hasOwnProperty('activo') ? ((props?.row?.activo !== 'Activo') && !props?.esMatriz && !props?.esAvancePorConfirmar && !props?.esListaEstimacionesDefinitivas && !props?.esHito   && !props?.verDetalleNewDashbaord && !props?.accioesConsultaEstimaciones  && !props?.proyectoCatalogoEliminarValores ?
              <MenuItem onClick={() => props?.enAccion("reactivar")}>
                <IconButton aria-label={intl.formatMessage({ id: 'general_reactivar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                  <RefreshIcon /> <small>{intl.formatMessage({ id: 'general_reactivar' })}</small>
                </IconButton>
              </MenuItem> : null) : props?.row.hasOwnProperty('estatus') ? (props?.row?.estatus !== 'Activo' && !props?.esMatriz && !props?.esAvancePorConfirmar && !props?.esListaEstimacionesDefinitivas && !props?.esHito && !props?.esInsumos && !props?.esParametrosAnalisis  && !props?.verDetalleNewDashbaord && !props?.accioesConsultaEstimaciones  && !props?.proyectoCatalogoEliminarValores ?
                <MenuItem onClick={() => props?.enAccion("reactivar")}>
                  <IconButton aria-label={intl.formatMessage({ id: 'general_reactivar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                    <RefreshIcon /> <small>{intl.formatMessage({ id: 'general_reactivar' })}</small>
                  </IconButton>
                </MenuItem> : null) : null
        }


        {
          props?.esFrentes ?
            <MenuItem onClick={() => props?.enAccion("verFrente")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_ver_frente' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <PreviewIcon /> <small>{intl.formatMessage({ id: 'general_ver_frente' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esFrentes ?
            <MenuItem onClick={() => props?.enAccion("verDocumentos")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_ver_documentos' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <PlagiarismIcon /> <small>{intl.formatMessage({ id: 'general_ver_documentos' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esFrentes ?
            <MenuItem onClick={() => props?.enAccion("subirDocumentos")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_agregar_docs' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <NoteAddIcon /> <small>{intl.formatMessage({ id: 'menu_agregar_docs' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esFrentes ?
            <MenuItem onClick={() => props?.enAccion("verNotas")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_ver_notas' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <DocumentScannerIcon /> <small>{intl.formatMessage({ id: 'general_ver_notas' })}</small>
              </IconButton>
            </MenuItem> : null
        }
        {
          props?.esFrentes ?
            <MenuItem onClick={() => props?.enAccion("subirNotas")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_subir_nota' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <NoteAddIcon /> <small>{intl.formatMessage({ id: 'general_subir_nota' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esFrentes ?
            <MenuItem onClick={() => props?.enAccion("programa")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_programa' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <EventIcon /> <small>{intl.formatMessage({ id: 'general_programa' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esFrentes && (esCoordinador || esModoDios) ?
            <MenuItem onClick={() => props?.enAccion("cargaConceptos")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_carga_conceptos' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <SummarizeIcon /> <small>{intl.formatMessage({ id: 'menu_carga_conceptos' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esFrentes && (esCoordinador || esModoDios) ?
            <MenuItem onClick={() => props?.enAccion("agregarInteligente")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_carga_AI' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <SmartToyIcon /> <small>{intl.formatMessage({ id: 'menu_carga_AI' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esAvancePorConfirmar ?
            <MenuItem onClick={() => props?.enAccion("confirmarAvance")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_confirmar_avance' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <CheckBoxIcon /> <small>{intl.formatMessage({ id: 'menu_confirmar_avance' })}</small>
              </IconButton>
            </MenuItem> : null
        }


        {
          props?.esListaEstimacionesDefinitivas ? <MenuItem onClick={() => props?.enAccion("verEstimacion")}>
            <IconButton aria-label={intl.formatMessage({ id: 'menu_ver_estimacion' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <PreviewIcon /> <small>{intl.formatMessage({ id: 'menu_ver_estimacion' })}</small>
            </IconButton>
          </MenuItem> : null
        }
        {
          props?.esListaEstimacionesDefinitivas && !props?.esEstimacionesContratista ? <MenuItem onClick={() => props?.enAccion("agregarDocumentos")}>
            <IconButton aria-label={intl.formatMessage({ id: 'menu_agregar_docs' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <UploadFileIcon /> <small>{intl.formatMessage({ id: 'menu_agregar_docs' })}</small>
            </IconButton>
          </MenuItem> : null
        }
        {
          props?.esListaEstimacionesDefinitivas ? <MenuItem onClick={() => props?.enAccion("verBitacora")}>
            <IconButton aria-label={intl.formatMessage({ id: 'menu_ver_bitacora' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <DvrIcon /> <small>{intl.formatMessage({ id: 'menu_ver_bitacora' })}</small>
            </IconButton>
          </MenuItem> : null
        }
        {
          props?.esListaEstimacionesDefinitivas ? <MenuItem onClick={() => props?.enAccion("generarPDF")}>
            <IconButton aria-label={intl.formatMessage({ id: 'menu_generar_pdf' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <PictureAsPdfIcon /> <small>{intl.formatMessage({ id: 'menu_generar_pdf' })} {props?.row?.posicion} </small>
            </IconButton>
          </MenuItem> : null
        }
        {
          props?.esListaEstimacionesDefinitivas && ([1,2,3,4,5].includes(props?.row?.id_estatus) ) && props?.row?.posicion === 'Último'  && (esCoordinador || esModoDios) ? <MenuItem onClick={() => props?.enAccion("editar")}>
            <IconButton aria-label={intl.formatMessage({ id: 'menu_editar_estimacion' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <EditIcon /> <small>{intl.formatMessage({ id: 'menu_editar_estimacion' })}</small>
            </IconButton>
          </MenuItem> : null
        }

        {
          props?.esListaEstimacionesDefinitivas && (props?.row?.id_estatus === 1) && (esCoordinador || esModoDios || esContratista) && !props?.esEstimacionesContratista ?
            <MenuItem onClick={() => props?.enAccion("enviar_revision")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_enviar_revision' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <SendIcon /> <small>{intl.formatMessage({ id: 'menu_enviar_revision' })}</small>
              </IconButton>
            </MenuItem> :
            null
        }


        {
          props?.esListaEstimacionesDefinitivas && (props?.row?.id_estatus === 2) && (esRevisor || esModoDios) && !props?.esEstimacionesContratista ?
            <MenuItem onClick={() => props?.enAccion("enviar_revisada")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_revisar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <SendIcon /> <small>{intl.formatMessage({ id: 'menu_revisar' })}</small>
              </IconButton>
            </MenuItem> :
            null
        }

        {
          props?.esListaEstimacionesDefinitivas && (props?.row?.id_estatus === 3) && (esCoordinador || esModoDios) && !props?.esEstimacionesContratista ?
            <MenuItem onClick={() => props?.enAccion("enviar_coordinacion")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_enviar_coordinacion' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <SendIcon /> <small>{intl.formatMessage({ id: 'menu_enviar_coordinacion' })}</small>
              </IconButton>
            </MenuItem> :
            null
        }

        {
          props?.esListaEstimacionesDefinitivas && (props?.row?.id_estatus === 6 || props?.row?.id_estatus === 7) && (esCoordinador || esModoDios) && !props?.esEstimacionesContratista ?
            <MenuItem onClick={() => props?.enAccion("generar_paquete")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_generar_paquete' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <FolderZipIcon /> <small>{intl.formatMessage({ id: 'menu_generar_paquete' })}</small>
              </IconButton>
            </MenuItem> :
            null
        }

        {
          props?.esHito && (props?.row?.estatus === 1 && props?.row?.autorizar === 0) ?
            <MenuItem onClick={() => props?.enAccion("eliminar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> :
            null
        }

        {
          props?.esHito && (props?.row?.estatus === 1 && props?.row?.autorizar === 0) ?
            <MenuItem onClick={() => props?.enAccion("cerrar_hito")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_cerrar_hito' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <HighlightOffIcon /> <small>{intl.formatMessage({ id: 'menu_cerrar_hito' })}</small>
              </IconButton>
            </MenuItem> :
            null
        }

        {
          props?.esResponsablesConcepto ?
            <MenuItem onClick={() => props?.enAccion("eliminar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> :
            null
        }

        {
          props?.esPrograma ?
            <MenuItem onClick={() => props?.enAccion("eliminar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> :
            null
        }

        {
          props?.esCatalogoDeConceptos ? <MenuItem onClick={() => props?.enAccion("agregar_foto_video")}>
            <IconButton aria-label={intl.formatMessage({ id: 'general_agregar_foto_video' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <AddAPhotoIcon /> <small>{intl.formatMessage({ id: 'general_agregar_foto_video' })}</small>
            </IconButton>
          </MenuItem> :
            null
        }

        {
          props?.esCatalogoDeConceptos ? <MenuItem onClick={() => props?.enAccion("agregar_nota")}>
            <IconButton aria-label={intl.formatMessage({ id: 'general_agregar_nota' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <NoteAddIcon /> <small>{intl.formatMessage({ id: 'general_agregar_nota' })}</small>
            </IconButton>
          </MenuItem> :
            null
        }

        {
          props?.esCatalogoDeConceptos ? <MenuItem onClick={() => props?.enAccion("ver_nota")}>
            <IconButton aria-label={intl.formatMessage({ id: 'general_ver_notas' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <DescriptionIcon /> <small>{intl.formatMessage({ id: 'general_ver_notas' })}</small>
            </IconButton>
          </MenuItem> :
            null
        }

        {
          props?.esCatalogoDeConceptos ? <MenuItem onClick={() => props?.enAccion("agregar_avance")}>
            <IconButton aria-label={intl.formatMessage({ id: 'general_agregar_avance' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <PlusOneIcon /> <small>{intl.formatMessage({ id: 'general_agregar_avance' })}</small>
            </IconButton>
          </MenuItem> :
            null
        }

        {
          props?.esCatalogoDeConceptos ? <MenuItem onClick={() => props?.enAccion("agregar_documento")}>
            <IconButton aria-label={intl.formatMessage({ id: 'general_agregar_documento' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <UploadFileIcon /> <small>{intl.formatMessage({ id: 'general_agregar_documento' })}</small>
            </IconButton>
          </MenuItem> :
            null
        }

        {
          props?.esCatalogoDeConceptos && [2, 3, 4].includes(props?.row?.estatusNumero) ? <MenuItem onClick={() => props?.enAccion("aprobar_concepto")}>
            <IconButton aria-label={intl.formatMessage({ id: 'general_aprobar_concepto' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <CheckCircleIcon /> <small>{intl.formatMessage({ id: 'general_aprobar_concepto' })}</small>
            </IconButton>
          </MenuItem> :
            null
        }

        {
          /* lA OPCION DE ELIMINAR LOS CONCEPTOS Y SU CONTENIDO UNICAMENTE SE DEJA LA TAREA AL SUPER ADMINISTRADOR */
          props?.esCatalogoDeConceptos && ![2, 3, 4].includes(props?.row?.estatusNumero) && esModoDios ? <MenuItem onClick={() => props?.enAccion("eliminar_concepto")}>
            <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
            </IconButton>
          </MenuItem> :
            null
        }

        {
          props?.esCatalogoDeConceptos && props?.row?.estatusNumero === 0 ? <MenuItem onClick={() => props?.enAccion("habilitar_concepto")}>
            <IconButton aria-label={intl.formatMessage({ id: 'general_habilitar_concepto' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <PublishedWithChangesIcon /> <small>{intl.formatMessage({ id: 'general_habilitar_concepto' })}</small>
            </IconButton>
          </MenuItem> :
            null
        }

        {
          props?.esCatalogoDeConceptos && props?.row?.estatusNumero > 0 ? <MenuItem onClick={() => props?.enAccion("deshabilitar_concepto")}>
            <IconButton aria-label={intl.formatMessage({ id: 'general_deshabilitar_concepto' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <UpdateDisabledIcon /> <small>{intl.formatMessage({ id: 'general_deshabilitar_concepto' })}</small>
            </IconButton>
          </MenuItem> :
            null
        }
        {
          props?.esEstimacionesCreadasContratista ?
            <MenuItem onClick={() => props?.enAccion("subir_documento")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_agregar_docs' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <NoteAddIcon /> <small>{intl.formatMessage({ id: 'menu_agregar_docs' })}</small>
              </IconButton>
            </MenuItem> : null
        }
        {
          props?.esEstimacionesCreadasContratista ?
            <MenuItem onClick={() => props?.enAccion("editar_estatus")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_editar_estatus' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <NoteAddIcon /> <small>{intl.formatMessage({ id: 'menu_editar_estatus' })}</small>
              </IconButton>
            </MenuItem> : null
        }
        {
          props?.esEstimacionesCreadasContratista && props?.row?.posicion === 'Último' && ([1,2,3,4,5].includes(props?.row?.id_estatus) ) ?
            <MenuItem onClick={() => props?.enAccion("editar_estimacion")}>
              <IconButton aria-label={intl.formatMessage({ id: 'menu_editar_estimacion' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <EditIcon /> <small>{intl.formatMessage({ id: 'menu_editar_estimacion' })}</small>
              </IconButton>
            </MenuItem> : null
        }


        {
          props?.esInsumos ?
            <MenuItem onClick={() => props?.enAccion("eliminar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <PreviewIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esInsumos && +props?.row?.disponible   ?
            <MenuItem onClick={() => props?.enAccion("registrarSalida")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_registrar_salida' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <PreviewIcon /> <small>{intl.formatMessage({ id: 'general_registrar_salida' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esInsumos ?
            <MenuItem onClick={() => props?.enAccion("registrarEntrada")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_registrar_entrada' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <PreviewIcon /> <small>{intl.formatMessage({ id: 'general_registrar_entrada' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esInsumos ?
            <MenuItem onClick={() => props?.enAccion("verKardex")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_ver_kardex' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <PreviewIcon /> <small>{intl.formatMessage({ id: 'general_ver_kardex' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.esParametrosAnalisis ?
            <MenuItem onClick={() => props?.enAccion("eliminar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <PreviewIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.accioesBitacoraEstimaciones || props?.accioesConsultaEstimaciones ?
            <MenuItem onClick={() => props?.enAccion("ver_estimacion")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_ver_estimacion' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <TroubleshootIcon /> <small>{intl.formatMessage({ id: 'general_ver_estimacion' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {
          props?.accioesBitacoraEstimaciones || props?.accioesConsultaEstimaciones ?
            <MenuItem onClick={() => props?.enAccion("ver_bitacora")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_ver_bitacora' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <FeaturedPlayListIcon /> <small>{intl.formatMessage({ id: 'general_ver_bitacora' })}</small>
              </IconButton>
            </MenuItem> : null
        }

        {/* {
          props?.accioesBitacoraEstimaciones ?
            <MenuItem onClick={() => props?.enAccion("procesa_360")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_procesando_306' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <ChangeCircleIcon /> <small>{intl.formatMessage({ id: 'general_procesando_306' })}</small>
              </IconButton>
            </MenuItem> : null
        } */}

        {
          props?.verDetalleNewDashbaord ?
            <MenuItem onClick={() => props?.enAccion("ver_detalle")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_ver_detalle' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <CallMissedOutgoingIcon /> <small>{intl.formatMessage({ id: 'general_ver_detalle' })}</small>
              </IconButton>
            </MenuItem> : null
        }


        {props?.proyectoAgregarValores ?
            <MenuItem onClick={() => props?.enAccion("agregar_valores_proyecto")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_agregar_valores_proyecto' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <PinIcon /> <small>{intl.formatMessage({ id: 'general_agregar_valores_proyecto' })}</small>
              </IconButton>
            </MenuItem> : null}


            {props?.proyectoAgregarValores ?
            <MenuItem onClick={() => props?.enAccion("ver_valores_proyecto")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_ver_valores_proyecto' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <LoupeIcon /> <small>{intl.formatMessage({ id: 'general_ver_valores_proyecto' })}</small>
              </IconButton>
            </MenuItem> : null}


            {props?.proyectoAgregarValoresConceptos ?
            <MenuItem onClick={() => props?.enAccion("agregar_concepto_plantilla")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_agregar_valores_conceptos' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <AddBoxIcon /> <small>{intl.formatMessage({ id: 'general_agregar_valores_conceptos' })}</small>
              </IconButton>
            </MenuItem> : null}

            {props?.proyectoAgregarValoresConceptos ?
            <MenuItem onClick={() => props?.enAccion("eliminar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <AddBoxIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> : null}


            {props?.proyectoAgregarValoresConceptos ?
            <MenuItem onClick={() => props?.enAccion("ver_catalogo")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_ver_valores_catalogo' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <AddBoxIcon /> <small>{intl.formatMessage({ id: 'general_ver_valores_catalogo' })}</small>
              </IconButton>
            </MenuItem> : null}

            {
              props?.proyectoCatalogoEliminarValores  ? <MenuItem onClick={() => props?.enAccion("eliminar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> : null
            }

            {
              props?.esProgramaGuardado  ? <MenuItem onClick={() => props?.enAccion("aplicar_programa")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_aplicar_programa' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <EventAvailableIcon /> <small>{intl.formatMessage({ id: 'general_aplicar_programa' })}</small>
              </IconButton>
            </MenuItem> : null
            }


            {
              props?.esProgramaGuardado  ? <MenuItem onClick={() => props?.enAccion("ver_programa")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_ver_programa' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <CalendarMonthIcon /> <small>{intl.formatMessage({ id: 'general_ver_programa' })}</small>
              </IconButton>
            </MenuItem> : null
            }

            {
              props?.esProgramaGuardado  ? <MenuItem onClick={() => props?.enAccion("eliminar_programa")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> : null
            }



            {
              props?.esUsuariosGeocerca  ? <MenuItem onClick={() => props?.enAccion("eliminar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> : null
            }

          
            {
              props?.esInfoCarrusel ? <MenuItem onClick={() => props?.enAccion("editar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_editar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <EditIcon /> <small>{intl.formatMessage({ id: 'general_editar' })}</small>
              </IconButton>
            </MenuItem> : null
            }

{
              props?.esInfoCarrusel ? <MenuItem onClick={() => props?.enAccion("eliminar")}>
              <IconButton aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
                <DeleteIcon /> <small>{intl.formatMessage({ id: 'general_eliminar' })}</small>
              </IconButton>
            </MenuItem> : null
            }


      </Menu>
    </div>
  );
};

export default AccionesTable;
