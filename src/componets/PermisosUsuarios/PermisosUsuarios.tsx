import React, { useMemo } from 'react'
import "./style.scss";
import { Grid } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import DinamicTable from '../DinamicTable';
import FolderIcon from '@mui/icons-material/Folder';
import type PermisosUsuariosProps from './types';
import _ from 'lodash';
import usePermisosUsuarios from './usePermisosUsuarios';

const PermisosUsuarios: React.FC<PermisosUsuariosProps> = (props: PermisosUsuariosProps) => {
  
  const {
    darkMode,
    armaArregloUsuariosPermisos,
  } = usePermisosUsuarios(props);

  return (
    <Grid container spacing={2}>
        <Grid item xs={props?.soloPermisos ? 12 : 6} >
        <Grid item xs={12}  className='bordersContainers' style={darkMode ? {backgroundColor:'#1f283e', padding:'10px', minHeight: '600px'}: {backgroundColor:'#fff',padding:'10px', minHeight: '600px'}}>
        <h5 className='colorOrange'><GroupIcon color='primary' /> Usuario{props?.soloPermisos ? '' : 's'}</h5>
           
              {!_.isEmpty(armaArregloUsuariosPermisos) ? <DinamicTable
                key={JSON.stringify(armaArregloUsuariosPermisos)}
                data={armaArregloUsuariosPermisos}
                titulo={''}
                enAccion={props?.accion}
              /> : null}
           
              



        </Grid>
        </Grid>

        {!props?.soloPermisos ? <Grid item xs={6} >
        <Grid item xs={12}  className='bordersContainers' style={darkMode ? {backgroundColor:'#1f283e', padding:'10px', minHeight: '600px'}: {backgroundColor:'#fff', padding:'10px', minHeight: '600px'}}>
        <h5 className='colorOrange'><FolderIcon color='primary' /> Carpetas</h5>
              <DinamicTable
                key={'Carpetas'}
                data={[{ Nombre: 'carpeta 1', ir: '1,2,3,4,5' }]}
                titulo={''}
              />

        </Grid>
        
        </Grid> : null }
       
      </Grid>
     
    
  )
}

export default PermisosUsuarios
