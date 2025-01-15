import React, { useState } from 'react'
import { Button, Menu, MenuItem,IconButton, } from "@mui/material";
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useIntl } from 'react-intl';
import { useMaterialUIController } from 'context';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EventIcon from '@mui/icons-material/Event';

interface MemuPros {
    item:any
    esModoDios:any
    esCoordinador:any
    color:any
    setItemEdit:any
    handleisAlertOpenEdit:any
    deletePregunta:any
    handleisAlertOpenConcepto:any
}

const MenuExpandible = (props:MemuPros) => {
    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div>
            <Button
                size="small"
                type="button"
                id={"panel1-header_menu_btn" + props?.item?.id}
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
                    (props?.esCoordinador || props?.esModoDios) ?
                        <MenuItem onClick={() => { }}>
                            <IconButton style={{ color:props?.color }} aria-label={intl.formatMessage({ id: 'general_subir_foto' })} size="small">
                                <AddPhotoAlternateIcon /> <small style={{ color: darkMode ? 'white' : '#344767' }}>{intl.formatMessage({ id: 'general_subir_foto' })}</small>
                            </IconButton>
                        </MenuItem> : null
                }
                {
                    (props?.esCoordinador || props?.esModoDios) ?
                        <MenuItem onClick={() => { props?.setItemEdit(props?.item); props?.handleisAlertOpenEdit(); }}>
                            <IconButton style={{ color:props?.color }} aria-label={intl.formatMessage({ id: 'general_editar' })} size="small">
                                <EditIcon /> <small style={{ color: darkMode ? 'white' : '#344767' }}>{intl.formatMessage({ id: 'general_editar' })}</small>
                            </IconButton>
                        </MenuItem> : null
                }
                {
                    (props?.esCoordinador || props?.esModoDios) && props?.item?.estatus === 'Activo' ?
                        <MenuItem onClick={props?.deletePregunta}>
                            <IconButton style={{ color:props?.color }} aria-label={intl.formatMessage({ id: 'general_eliminar' })} size="small">
                                <DeleteIcon /> <small style={{ color: darkMode ? 'white' : '#344767' }}>{intl.formatMessage({ id: 'general_eliminar' })}</small>
                            </IconButton>
                        </MenuItem> : null
                }
                {
                    (props?.esCoordinador || props?.esModoDios) && props?.item?.estatus === 'Inactivo' ?
                        <MenuItem onClick={props?.deletePregunta}>
                            <IconButton style={{ color:props?.color }} aria-label={intl.formatMessage({ id: 'general_reactivar' })} size="small">
                                <RefreshIcon /> <small style={{ color: darkMode ? 'white' : '#344767' }}>{intl.formatMessage({ id: 'general_reactivar' })}</small>
                            </IconButton>
                        </MenuItem> : null
                }
                {
                    (props?.esCoordinador || props?.esModoDios) ?
                        <MenuItem>
                            <IconButton style={{ color:props?.color }} aria-label={intl.formatMessage({ id: 'general_subir_foto' })} size="small">
                                <AddPhotoAlternateIcon /> <small style={{ color: darkMode ? 'white' : '#344767' }}>{intl.formatMessage({ id: 'general_subir_foto' })}</small>
                            </IconButton>
                        </MenuItem> : null
                }
                {
                    (props?.esCoordinador || props?.esModoDios) ?
                        <MenuItem>
                            <IconButton style={{ color:props?.color }} aria-label={intl.formatMessage({ id: 'general_ver_fotos' })} size="small">
                                <ImageSearchIcon /> <small style={{ color: darkMode ? 'white' : '#344767' }}>{intl.formatMessage({ id: 'general_ver_fotos' })}</small>
                            </IconButton>
                        </MenuItem> : null
                }
                {
                    (props?.esCoordinador || props?.esModoDios) ?
                        <MenuItem>
                            <IconButton style={{ color:props?.color }} aria-label={intl.formatMessage({ id: 'general_nota' })} size="small">
                                <NoteAddIcon /> <small style={{ color: darkMode ? 'white' : '#344767' }}>{intl.formatMessage({ id: 'general_nota' })}</small>
                            </IconButton>
                        </MenuItem> : null
                }
                {
                    (props?.esCoordinador || props?.esModoDios) ?
                        <MenuItem>
                            <IconButton style={{ color:props?.color }} aria-label={intl.formatMessage({ id: 'general_programa' })} size="small">
                                <EventIcon /> <small style={{ color: darkMode ? 'white' : '#344767' }}>{intl.formatMessage({ id: 'general_programa' })}</small>
                            </IconButton>
                        </MenuItem> : null
                }
                {
                    (props?.esCoordinador || props?.esModoDios) ?
                        <MenuItem>
                            <IconButton style={{ color:props?.color }} aria-label={intl.formatMessage({ id: 'menu_carga_conceptos' })} size="small" onClick={() => { props?.setItemEdit(props?.item); props?.handleisAlertOpenConcepto(); }}>
                                <SummarizeIcon /> <small style={{ color: darkMode ? 'white' : '#344767' }}>{intl.formatMessage({ id: 'menu_carga_conceptos' })}</small>
                            </IconButton>
                        </MenuItem> : null
                }
            </Menu>

        </div>
    )
}

export default MenuExpandible
