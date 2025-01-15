import React from 'react'
import { useMaterialUIController } from "context";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import _ from 'lodash';
import type { CardsUsuariosAsignacionContratoProps } from './CardsUsuariosAsignacionContrato';
import { useIntl } from 'react-intl';


export const useCardsUsuariosAsignacionContrato = (props: CardsUsuariosAsignacionContratoProps) => {
  const intl = useIntl();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isChecked, setChecked] = useState<boolean>(false);
    const [id_perfil, setId_perfil] = useState<string>('');
    const [id_puesto, setId_puesto] = useState<string>('');
    const [id_landin_page, setId_landin_page] = useState<string>('');
    const [esRegistroPorBoton, setEsRegistroPorBoton] = useState<boolean>(false);
    const [orden, setOrden] = useState<string>('');
    
    const catalogoPerfiles = useSelector(
      (state: StoreType) => {
        const objects = state?.app?.catalogos?.['apm_cat_perfiles_cliente'] || [];
        return _.uniqBy(objects, 'nombre');
      }
    );
  
    const catalogoPuestos = useSelector(
      (state: StoreType) => {
        return (state?.app?.catalogos?.['apm_cat_puestos'] || []);
      }
    );
  
    const catalogoPaginasInicio = useSelector(
      (state: StoreType) => {
        return (state?.app?.catalogos?.['apm_cat_pagina_inicio'] || []);
      }
    );
  
    const formik = useFormik({
      initialValues: {
        id_perfil: "",
        id_puesto: "",
        id_landin_page:"",
        orden: ""
      },
      onSubmit: async (values) => {},
      validationSchema: Yup.object({
        id_perfil: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
        id_puesto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
        id_landin_page: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
        orden: Yup.string().matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      }),
    });
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      props?.onCheck(event.target.checked, { id_usuario: props?.usuario?.id, id_perfil, id_puesto, id_contrato: props?.contratoId, orden, id_landin_page });
  
    };
    return {
        darkMode,
        formik,
        esRegistroPorBoton,
        handleChange,
        id_perfil,
        catalogoPerfiles,
        setId_perfil,
        id_puesto,
        setId_puesto,
        catalogoPuestos,
        id_landin_page,
        setId_landin_page,
        orden,
        setOrden,
        setEsRegistroPorBoton,
        catalogoPaginasInicio,
        isChecked,
        intl
  }
}
