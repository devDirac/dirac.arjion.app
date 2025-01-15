import { FormikTouched, setNestedObjectValues, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import type { AddDeductivaFormProps } from "./types";
import _ from "lodash";
import { useSelector } from "react-redux";
import { StoreType } from "../../types/geericTypes";

const useAddDeductivaForm = (props: AddDeductivaFormProps) => {
  const intl = useIntl();

  const [folio, setFolio] = useState<string>('');
  const [contratista, setContratista] = useState<string>('');
  const [contrato, setContrato] = useState<string>('');
  const [concepto, setConcepto] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [monto, setMonto] = useState<string>('');
  const contratistas = useSelector(
    (state: StoreType) => {
      if (props?.obra) {
        return (state?.app?.catalogos?.['apm_contratistas'] || []).filter((o: any) => o?.id_obra === +(props?.obra?.id || 0));
      }
      return (state?.app?.catalogos?.['apm_contratistas'] || []);
    }
  );

  const formik = useFormik({
    initialValues: {
      folio: "",
      contratista: "",
      contrato: "",
      concepto: "",
      descripcion: "",
      monto: ""
    },
    onSubmit: async (values) => { },
    validationSchema: Yup.object({
      folio: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      contratista: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      contrato: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      concepto: Yup.string().max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      descripcion: Yup.string()
        .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
        .max(500, intl.formatMessage({ id: "input_validation_max_500" }))
        .required(intl.formatMessage({ id: "input_validation_requerido" })),
      monto: Yup.string().max(15, intl.formatMessage({ id: 'input_validation_max_15' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' }))
    }),
  });

  useEffect(() => {
    if (props?.resetForm) {
      setFolio('');
      setContratista('');
      setContrato('');
      setConcepto('');
      setDescripcion('');
      setMonto('');
      formik.resetForm();
    }
  }, [props?.resetForm]);

  const validate = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
    } else {
      formik.setTouched(
        setNestedObjectValues<FormikTouched<any>>(errors, true)
      );
    }
  };

  useEffect(() => {

    if (props?.item && props?.item?.folio) {
      formik.setFieldValue("folio", props?.item?.folio || '');
      setFolio(props?.item?.folio || '');
    }

    if (props?.item && props?.item?.id_contratista) {
      formik.setFieldValue("contratista", (props?.item?.id_contratista+'') || '');
      setContratista((props?.item?.id_contratista+'') || '');
    }

    if (props?.item && props?.item?.id_contrato) {
      formik.setFieldValue("contrato", (props?.item?.id_contrato+'') || '');
      setContrato((props?.item?.id_contrato+'') || '');
    }

    if (props?.item && props?.item?.concepto) {
      formik.setFieldValue("concepto", props?.item?.concepto || '');
      setConcepto(props?.item?.concepto || '');
    }

    if (props?.item && props?.item?.descripcion) {
      formik.setFieldValue("descripcion", props?.item?.descripcion || '');
      setDescripcion(props?.item?.descripcion || '');
    }

    if (props?.item && props?.item?.monto) {
      formik.setFieldValue("monto", +props?.item?.monto || '');
      setMonto(props?.item?.monto || '');
    }

    if (!_.isEmpty(props?.item)) {
      validate();
    }
  }, [props?.item]);


  return {
    intl,
    formik,
    folio,
    setFolio,
    contratista,
    contratistas,
    setContratista,
    contrato,
    setContrato,
    concepto,
    setConcepto,
    descripcion,
    setDescripcion,
    monto,
    setMonto
  }
}

export default useAddDeductivaForm
