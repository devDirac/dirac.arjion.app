import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import type { AccionesTableProps } from "./types";
import { useAccionesTable } from './useAccionesTable'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useIntl } from "react-intl";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import './style.scss';
import { useMaterialUIController } from "context";
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FolderZipIcon from '@mui/icons-material/FolderZip';

const AccionesTable: React.FC<AccionesTableProps> = (
  props: AccionesTableProps
) => {

  const intl = useIntl();
  const [controller] = useMaterialUIController();
  const {
    darkMode
  } = controller;

  const {
    anchorEl,
    handleClick,
    handleClose
  } = useAccionesTable(props);

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
          props?.esGastoSolicitante ? <MenuItem onClick={() => props?.enAccion("verDetalle")}>
            <IconButton aria-label={intl.formatMessage({ id: 'general_ver_detalle' })} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <PlagiarismIcon /> <small>{intl.formatMessage({ id: 'general_ver_detalle' })}</small>
            </IconButton>
          </MenuItem> : null
        }

        {
          props?.esGastoSolicitante && (props?.row?.id_estatus === 5) ? <MenuItem onClick={() => props?.enAccion("descargarDocumentos")}>
            <IconButton aria-label={'Descargar documentos '} size="small" style={{ color: darkMode ? '#fff' : 'rgb(31, 40, 62)' }}>
              <FolderZipIcon /> <small>{'Descargar documentos '}</small>
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
