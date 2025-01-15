import type { TarjetaContratoProps } from './types'
import { useSelector } from 'react-redux'
import { StoreType } from '../../types/geericTypes'

export const useTarjetaContrato = (props: TarjetaContratoProps) => {
    const contratistas = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_contratistas']
    );
    const catalogoTiposContrato = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_cat_tipo_contrato']
    );
    const catalogoObras = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_obras']
    );
    const catalogoPeps = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_pep']
    );

    const catalogoClasificacionContrato = useSelector(
        (state: StoreType) => {
            return (state?.app?.catalogos?.['apm_cat_clasificacion_contrato'] || []);
        }
    );


    const catalogoTipoContratoExt = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_cat_tipo_contrato_ext']
    );

    const catalogoEspecialidades = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_cat_especialidades']
    );

    const estatus = [{
        label: 'Activo',
        value: "1"
    }, {
        label: 'Inactivo',
        value: '0'
    }];

    const cientes = props?.cientes || [];
    const responsables = props?.responsables || [];
    const autorizado = [{
        label: 'Sin envío',
        value: "0"
    }, {
        label: 'Por autorizar',
        value: '1'
    }, {
        label: 'Autorizado',
        value: '2'
    }, {
        label: 'Cancelado',
        value: '3'
    }];

    const id_autorizador = props?.responsables || [];

    const terminado = [{
        label: 'activo',
        value: "0"
    }, {
        label: 'terminado',
        value: '1'
    }, {
        label: 'Rescindido',
        value: '2'
    }];

    const id_tipo_proyecto = [{
        label: 'Presupuesto',
        value: '1'
    }, {
        label: 'Cotizado',
        value: '2'
    }, {
        label: 'Contratado',
        value: '3'
    }];

    const moneda = [{
        label: 'Pesos',
        value: '1'
    }, {
        label: 'Dolares',
        value: '2'
    }, {
        label: 'Euros',
        value: '3'
    }];

    const alertas = [{
        label: 'Si',
        value: '1'
    }, {
        label: 'No',
        value: '0'
    }];

    const reclasificacion = [{
        label: 'Si',
        value: '1'
    }, {
        label: 'No',
        value: '0'
    }];

    const propietario = [{
        label: 'Si',
        value: '1'
    }, {
        label: 'No',
        value: '0'
    }];

    return {
        contratistas,
        estatus,
        cientes,
        responsables,
        autorizado,
        id_autorizador,
        terminado,
        catalogoTiposContrato,
        catalogoObras,
        id_tipo_proyecto,
        catalogoPeps,
        moneda,
        alertas,
        catalogoEspecialidades,
        reclasificacion,
        propietario,
        catalogoTipoContratoExt,
        catalogoClasificacionContrato
    }
}
