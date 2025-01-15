import { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import type { SeleccionProyectoProps } from './types';
import { useIntl } from 'react-intl';

export const useSeleccionProyecto = (props: SeleccionProyectoProps) => {
  const espacio = useSelector((state: any) => state?.app?.espacio || null);
  const superAdministrador = useSelector((state: any) => state?.app?.user?.data?.tipo_usuario || [])?.find((e: any) => e?.id === 3);
  const [obra, setObra] = useState("");
  const intl = useIntl();
  const obras = useSelector(
    (state: StoreType) => state?.app?.catalogos?.["apm_obras"]
  );
  const formik = useFormik({
    initialValues: {
      obra: "",
    },
    onSubmit: async (values) => {},
    validationSchema: Yup.object({
      obra: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
    }),
  });
  useEffect(() => {
    if (props?.resetForm) {
      formik.resetForm();
    }
  }, [props?.resetForm]);

  return {
    formik,
        obra,
        obras,
        setObra,
        espacio,
        intl,
        superAdministrador
  };
};
