import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../types/geericTypes";
import { guardaGrafica } from "../../actions/charts";
import { getErrorHttpMessage } from "../../utils";
import { setAhut } from "../../actions/auth";
import { useIntl } from "react-intl";

export const useAddChartPage = () => {
    const intl = useIntl();
    const [procesando, setProcesando] = useState(false);
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    const addChart = async (data: any) => {
        try {
            setProcesando(true);
            await guardaGrafica(data);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            setProcesando(false);
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    };

    useEffect(() => {
        setAhut(token);
    }, [token]);

    return {
        addChart,
        procesando,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert
    }
}