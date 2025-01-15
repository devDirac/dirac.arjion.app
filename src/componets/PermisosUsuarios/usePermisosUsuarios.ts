import { useMemo } from 'react'
import PermisosUsuariosProps, { UsuariosPermisoResponse } from './types';
import { useMaterialUIController } from 'context';


const usePermisosUsuarios = (props: PermisosUsuariosProps) => {
    const [controller] = useMaterialUIController();
  const {
    darkMode
  } = controller;
  const armaArregloUsuariosPermisos = useMemo(() => {
    const tmp: any = [];
    (props?.dataUsuarios || []).forEach((e: UsuariosPermisoResponse) => {
      const existeRegistro = tmp?.findIndex((td: any) => td?.Usuario === e?.usuario);
      if (existeRegistro === -1) {
        const objTemp = { id: e?.id, Nombre: e?.name, Usuario: e?.usuario, Permisos: [{ tipo_permiso_id: e?.tipo_permiso_id, permiso: e?.permiso }] };
        tmp.push(objTemp);
      } else {
        tmp[existeRegistro].Permisos.push({ tipo_permiso_id: e?.tipo_permiso_id, permiso: e?.permiso });
      }
    });
    return tmp;
  }, [props?.dataUsuarios]);

  return {
    darkMode,
    armaArregloUsuariosPermisos
  }
}

export default usePermisosUsuarios
