import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import _ from 'lodash';

const useCatalogosPage = () => {
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    useEffect(() => {
        setAhut(token);
    }, [token]);

    const configsButton: any = !_.isEmpty(espacio) ? (
        <ComplexProjectCard
            muestraAvances
            image={espacio?.foto}
            title={espacio?.obra}
            element={espacio}
            contratos={espacio?.ctaAsignados}
            description={espacio?.descripcion}
            dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
            members={espacio?.asignados}
        />
    ) as any : null;

    return {
        espacio,
        configsButton
    }
}

export default useCatalogosPage
