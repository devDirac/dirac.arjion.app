import { useEffect, useState } from 'react';
import type { AddParametrosContratoFormProps } from './types';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import { FormikTouched, useFormik, setNestedObjectValues } from 'formik';
import { useMaterialUIController } from 'context';
import _ from 'lodash';

const useAddParametrosContratoForm = (props: AddParametrosContratoFormProps) => {
  const intl = useIntl();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [area_expide, setArea_expide] = useState('');
  const [tipo_contrato, setTipo_contrato] = useState('');
  const [fecha_contrato, setFecha_contrato] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [clave_presupuestaria, setClave_presupuestaria] = useState('');
  const [oficina_pagadora, setOficina_pagadora] = useState('');
  const [numero, setNumero] = useState('');
  const [amortizacion, setAmortizacion] = useState('');
  const [asignacion_iva, setAsignacion_iva] = useState('');
  const [numero_pedido, setNumero_pedido] = useState('');
  const [fecha_pedido, setFecha_pedido] = useState('');
  const [fecha_pago_lvpl, setFecha_pago_lvpl] = useState('');
  const [contabilizado, setContabilizado] = useState(false);
  const [pagado, setPagado] = useState(false);
  const [pendiente_contabilizar, setPendiente_contabilizar] = useState(false);
  const [pendiente_contabilizarDisabled, setPendiente_contabilizarDisabled] = useState(false);
  const [tipo_cambio, setTipo_cambio] = useState('');
  const [fondo_gtia, setFondo_gtia] = useState('');
  const [fecha_contabilizado, setFecha_contabilizado] = useState('');

  const formik = useFormik({
    initialValues: {
      area_expide: "",
      tipo_contrato: "",
      fecha_contrato: "",
      modalidad: "",
      clave_presupuestaria: "",
      oficina_pagadora: "",
      numero: "",
      amortizacion: "",
      asignacion_iva: "",
      numero_pedido: "",
      fecha_pedido: "",
      fecha_pago_lvpl: "",
      tipo_cambio: "",
      fondo_gtia: "",
      fecha_contabilizado: ""
    },
    onSubmit: async (values) => { },
    validationSchema: Yup.object({
      area_expide: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      tipo_contrato: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      fecha_contrato: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      modalidad: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      clave_presupuestaria: Yup.string().min(2, intl.formatMessage({ id: 'input_validation_min_2' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      oficina_pagadora: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      numero: Yup.string().max(150, intl.formatMessage({ id: 'input_validation_max_150' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      amortizacion: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })).test(
        "mayorA100",
        'Este valor no puede ser mayor a 100',
        (value) => {
          const date1 = 100;
          const date2 = +value;
          return date2 < date1
        }
      ),
      asignacion_iva: Yup.string().max(150, intl.formatMessage({ id: 'input_validation_max_150' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      numero_pedido: Yup.string().max(150, intl.formatMessage({ id: 'input_validation_max_150' })).matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      fecha_pedido: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      fecha_pago_lvpl: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      tipo_cambio: Yup.string().max(150, intl.formatMessage({ id: 'input_validation_max_150' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      fondo_gtia: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })).test(
        "mayorA100",
        'Este valor no puede ser mayor a 100',
        (value) => {
          const date1 = 100;
          const date2 = +value;
          return date2 < date1
        }
      ),
      fecha_contabilizado: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
    }),
  });

  const validate = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
    } else {
      formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
    }
  }

  useEffect(() => {
    if (props?.item && props?.item?.area_expide) {
      formik.setFieldValue("area_expide", props?.item?.area_expide || '');
      setArea_expide(props?.item?.area_expide);
    }
    if (props?.item && props?.item?.tipo_contrato) {
      formik.setFieldValue("tipo_contrato", props?.item?.tipo_contrato || '');
      setTipo_contrato(props?.item?.tipo_contrato);
    }
    if (props?.item && props?.item?.fecha_contrato) {
      formik.setFieldValue("fecha_contrato", props?.item?.fecha_contrato || '');
      setFecha_contrato(props?.item?.fecha_contrato);
    }
    if (props?.item && props?.item?.modalidad) {
      formik.setFieldValue("modalidad", props?.item?.modalidad || '');
      setModalidad(props?.item?.modalidad);
    }
    if (props?.item && props?.item?.clave_presupuestaria) {
      formik.setFieldValue("clave_presupuestaria", props?.item?.clave_presupuestaria || '');
      setClave_presupuestaria(props?.item?.clave_presupuestaria);
    }
    if (props?.item && props?.item?.oficina_pagadora) {
      formik.setFieldValue("oficina_pagadora", props?.item?.oficina_pagadora || '');
      setOficina_pagadora(props?.item?.oficina_pagadora);
    }
    if (props?.item && props?.item?.numero) {
      formik.setFieldValue("numero", props?.item?.numero || '');
      setNumero(props?.item?.numero);
    }
    if (props?.item && props?.item?.amortizacion) {
      formik.setFieldValue("amortizacion", props?.item?.amortizacion || '');
      setAmortizacion(props?.item?.amortizacion);
    }
    if (props?.item && props?.item?.asignacion_iva) {
      formik.setFieldValue("asignacion_iva", props?.item?.asignacion_iva || '');
      setAsignacion_iva(props?.item?.asignacion_iva);
    }
    if (props?.item && props?.item?.numero_pedido) {
      formik.setFieldValue("numero_pedido", props?.item?.numero_pedido || '');
      setNumero_pedido(props?.item?.numero_pedido);
    }
    if (props?.item && props?.item?.fecha_pedido) {
      formik.setFieldValue("fecha_pedido", props?.item?.fecha_pedido || '');
      setFecha_pedido(props?.item?.fecha_pedido);
    }
    if (props?.item && props?.item?.fecha_pago_lvpl) {
      formik.setFieldValue("fecha_pago_lvpl", props?.item?.fecha_pago_lvpl || '');
      setFecha_pago_lvpl(props?.item?.fecha_pago_lvpl);
    }
    if (props?.item && props?.item?.tipo_cambio) {
      formik.setFieldValue("tipo_cambio", props?.item?.tipo_cambio || '');
      setTipo_cambio(props?.item?.tipo_cambio);
    }
    if (props?.item && props?.item?.fondo_gtia) {
      formik.setFieldValue("fondo_gtia", props?.item?.fondo_gtia || '');
      setFondo_gtia(props?.item?.fondo_gtia);
    }
    if (props?.item && props?.item?.fecha_contabilizado) {
      formik.setFieldValue("fecha_contabilizado", props?.item?.fecha_contabilizado || '');
      setFecha_contabilizado(props?.item?.fecha_contabilizado);
    }
    if (props?.item && props?.item?.contabilizado) {
      setContabilizado(props?.item?.contabilizado);
    }
    if (props?.item && props?.item?.pagado) {
      setPagado(props?.item?.pagado);
    }
    if (props?.item && props?.item?.pendiente_contabilizar) {
      setPendiente_contabilizar(props?.item?.pendiente_contabilizar);
    }
    if (!_.isEmpty(props?.item)) {
      validate();
    }
  }, [props?.item]);

  return {
    intl,
    darkMode,
    formik,
    area_expide,
    setArea_expide,
    tipo_contrato,
    setTipo_contrato,
    fecha_contrato,
    setFecha_contrato,
    modalidad,
    setModalidad,
    clave_presupuestaria,
    setClave_presupuestaria,
    oficina_pagadora,
    setOficina_pagadora,
    numero,
    setNumero,
    amortizacion,
    setAmortizacion,
    asignacion_iva,
    setAsignacion_iva,
    numero_pedido,
    setNumero_pedido,
    fecha_pedido,
    setFecha_pedido,
    fecha_pago_lvpl,
    setFecha_pago_lvpl,
    tipo_cambio,
    setTipo_cambio,
    fondo_gtia,
    setFondo_gtia,
    fecha_contabilizado,
    setFecha_contabilizado,
    contabilizado,
    setContabilizado,
    pagado,
    setPagado,
    pendiente_contabilizar,
    setPendiente_contabilizar,
    pendiente_contabilizarDisabled, setPendiente_contabilizarDisabled
  }
}

export default useAddParametrosContratoForm
