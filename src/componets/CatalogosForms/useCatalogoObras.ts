import { useEffect, useState } from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';

const useCatalogoObras = (props: CatalogoEspecialidadProps) => {
    const intl = useIntl();
    const [test1, setTest1] = useState('');
    const [obra, setObra] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_inicio, setFecha_inicio] = useState('');
    const [fecha_fin, setFecha_fin] = useState('');
    const [id_estatus, setId_estatus] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [limite_contratos, setLimite_contratos] = useState('');
    const [presupuesto, setPresupuesto] = useState('');
    const [foto, setFoto] = useState('');
    const [id_cliente, setId_cliente] = useState<any>([]);
    const [catalogoSeleccionado, setCatalogoSeleccionado] = useState('');
    const [tipoCatalogo, setTipoCatalogo] = useState('');
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const estatusCatalogos = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_estatus_catalogos'] || []
    );

    const formik = useFormik({
        initialValues: {
            test1:"",
            obra: "",
            descripcion: "",
            fecha_inicio: "",
            fecha_fin: "",
            id_estatus: "",
            limite_contratos: "",
            presupuesto:"",
            id_cliente:[]
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            test1: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            obra: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            fecha_inicio: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            fecha_fin: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_estatus: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            limite_contratos: Yup.string().matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            presupuesto: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
        }),
    });

    const setImagen = (data: any) => setFoto(data);

    const validate = async() =>{
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
          formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
        }
      }
      
    useEffect(() => {

        if (props?.item && props?.item?.obra) {
            formik.setFieldValue("obra", props?.item?.obra || '');
            setObra(props?.item?.obra || '');
        }

        if (props?.item && props?.item?.descripcion) {
            formik.setFieldValue("descripcion", props?.item?.descripcion || '');
            setDescripcion(props?.item?.descripcion || '');
        }

        if (props?.item && props?.item?.fecha_inicio) {
            formik.setFieldValue("fecha_inicio", (new Date(props?.item?.fecha_inicio || '')).toISOString().split('T')[0]);
            setFecha_inicio((new Date(props?.item?.fecha_inicio || '')).toISOString().split('T')[0]);
        }

        if (props?.item && props?.item?.fecha_fin) {
            formik.setFieldValue("fecha_fin", (new Date(props?.item?.fecha_fin || '')).toISOString().split('T')[0]);
            setFecha_fin((new Date(props?.item?.fecha_inicio || '')).toISOString().split('T')[0]);
        }

        if (props?.item && props?.item?.id_estatus) {
            formik.setFieldValue("id_estatus", props?.item?.id_estatus+"" || '');
            setId_estatus(props?.item?.id_estatus+"" || '');
        }
        if (props?.item && props?.item?.address) {
            formik.setFieldValue("test1", props?.item?.address || '');
            setTest1(props?.item?.address || '');
        }

        if (props?.item && props?.item?.latitud) {
            setLatitud(props?.item?.latitud || '');
        }

        if (props?.item && props?.item?.longitud) {
            setLongitud(props?.item?.longitud || '');
        }
        if (props?.item && props?.item?.limite_contratos) {
            formik.setFieldValue("limite_contratos", props?.item?.limite_contratos || '');
            setLimite_contratos(props?.item?.limite_contratos || '');
        }

        if (props?.item && props?.item?.presupuesto) {
            formik.setFieldValue("presupuesto", props?.item?.presupuesto || '');
            setPresupuesto(props?.item?.presupuesto || '');
        }

        if (props?.item && props?.item?.foto) {
            setImagen(props?.item?.foto || '');
        }
        if(props?.item){
            validate();
        }
        

    }, [props?.item]);

    useEffect(() => {
        if (props?.resetForm) {
            setObra('');
            setDescripcion('');
            setFecha_inicio('');
            setFecha_fin('');
            setId_estatus('');
            setLatitud('');
            setLongitud('');
            setLimite_contratos('');
            setImagen(props?.item?.foto || '');
            setPresupuesto('');
            formik.resetForm();
        }
    }, [props?.resetForm]);

    return {
        formik,
        test1,
        setTest1,
        obra,
        setObra,
        descripcion,
        setDescripcion,
        fecha_inicio,
        setFecha_inicio,
        fecha_fin,
        setFecha_fin,
        latitud,
        setLatitud,
        longitud,
        setLongitud,
        id_estatus,
        estatusCatalogos,
        setId_estatus,
        limite_contratos,
        setLimite_contratos,
        foto,
        setImagen,
        presupuesto,
        setPresupuesto,
        intl,

        id_cliente,
        setCatalogoSeleccionado,
        setTipoCatalogo,
        handleOpen,
        setId_cliente,
        handleClose,
        isOpen
    }
}

export default useCatalogoObras
