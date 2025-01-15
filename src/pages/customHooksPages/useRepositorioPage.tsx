import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDocumentosRepositorio, setDocumento, unSetDocumento } from '../../actions/Repositorio';
import { getErrorHttpMessage } from '../../utils';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';
import { useMaterialUIController } from 'context';
import { useIntl } from 'react-intl';
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import _ from 'lodash';


const useRepositorioPage = () => {
    const intl = useIntl();
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const [procesando, setProcesando] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [isAlertOpen,setIsAlertOpen] = useState(false);
    const [mensajeAlert,setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [textModalConfirm, setTextModalConfirm] = useState('');
    const textTo = intl.formatMessage({ id: 'repositorio_obten_documentos' });
    const [item,setItem] = useState(null);
    const [controller] = useMaterialUIController();
    const {
      darkMode
    } = controller;

    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const configsButton: any = !_.isEmpty(espacio) ? (
        <ComplexProjectCard
            muestraAvances
            image={espacio?.foto}
            contratos={espacio?.ctaAsignados}
            title={espacio?.obra}
            element={espacio}
            description={espacio?.descripcion}
            dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
            members={espacio?.asignados}
        />
    ) as any : null;

    const handleAccionRepositorioPregunta = (_: string, row: any)=> {
        setItem(row);
        setOpenModalConfirm(true);
        setTextModalConfirm(intl.formatMessage({ id: 'repositorio_pregunta_eliminar_documento' }));
    }
    const handleAccionRepositorio = async () => {
        const row = item;
        try {
            setProcesando(true);
            await unSetDocumento(row);
            setMensajeAlert(intl.formatMessage({ id: 'repositorio_exito_elimina_documento' }));
            setProcesando(false);
            getData();
            setItem(null);
            setOpenModalConfirm(false);
            setTextModalConfirm('');
            handleisAlertOpen();
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'repositorio_error_elimina_documento' }));
            setProcesando(false);
            handleisAlertOpen();
            setItem(null);
            setOpenModalConfirm(false);
            setTextModalConfirm('');
        }
    }

    const handleFormulario = async (data: any) => {
        try {
            setProcesando(true);
            const data1 = new FormData();
            data1.append("file", data?.file);
            data1.append("nombre", data?.nombre);
            data1.append("descripcion", data?.descripcion);
            await setDocumento(data1);
            setMensajeAlert(intl.formatMessage({ id: 'repositorio_exito_alta_documento' }));
            setProcesando(false);
            getData();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'repositorio_error_alta_documento' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const getData = useCallback(async () => {
        try {
            setProcesando(true);
            const documentos = await getDocumentosRepositorio();
            setData(documentos);
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || textTo);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [textTo]);

    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        setAhut(token);
      }, [token]);

    return {
        data,
        handleFormulario,
        handleAccionRepositorio,
        procesando,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        darkMode,
        handleAccionRepositorioPregunta,
        openModalConfirm, setOpenModalConfirm,textModalConfirm, setTextModalConfirm,
        setItem,
        espacio,
        configsButton        
  }
}

export default useRepositorioPage
