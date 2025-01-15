import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import { saveUser } from '../../actions/users';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';

const useAddMultiUsersPage = () => {
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const [procesando, setProcesando] = useState<boolean>(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const [data, setData] = useState<any[]>([]);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [textModalConfirm, setTextModalConfirm] = useState('');
    const tiposUsuario = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_tipo_usuarios'] || []
    );
    const addUserPregunta = (data: any[]) => {
        setTextModalConfirm('La validación del archivo de excel fue exitosa, ¿Desea cargar la información de este archivo?');
        setData(data);
        setOpenModalConfirm(true);
    }
    const addUser = async () => {
        setOpenModalConfirm(false);
        setProcesando(true);
        await data.reduce(async (_: any, cat: any) => {
            try {
                await _;
                const userAlta = {
                    name: cat?.[0] || '',
                    usuario: cat?.[1] || '',
                    email: cat?.[2] || '',
                    password: cat?.[3] || '',
                    telefono: null,
                    id_tipo_usuario: tiposUsuario.find((e: any) => e?.tipo === cat?.[5])?.id || null
                };
                await saveUser(userAlta);
            } catch (error) { }
        }, Promise.resolve());
        setProcesando(false);
        setMensajeAlert('Exito al registrar usuarios');
        handleisAlertOpen();
    }

    const configsButton: any = !_.isEmpty(espacio) ? (
        <ComplexProjectCard
            muestraAvances
            image={espacio?.foto}
            title={espacio?.obra}
            contratos={espacio?.ctaAsignados}
            element={espacio}
            description={espacio?.descripcion}
            dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
            members={espacio?.asignados}
        />
    ) as any : null;


    useEffect(() => {
        setAhut(token);
    }, [token]);

    return {
        espacio,
        configsButton,
        setMensajeAlert,
        handleisAlertOpen,
        procesando,
        addUserPregunta,
        handleisAlerClose,
        isAlertOpen,
        mensajeAlert,
        addUser,
        setOpenModalConfirm,
        setTextModalConfirm,
        setData,
        openModalConfirm,
        textModalConfirm
    }
}

export default useAddMultiUsersPage
