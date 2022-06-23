import { destroyCookie } from 'nookies';
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { AuthTokenError } from '../services/errors/AuthTokenError';
import { setupApiClient } from '../services/api';
import { api } from '../services/apiClient';

import { withSSRAuth } from '../utils/withSSRAuth';
import { useCan } from '../hooks/useCan';

export default function Dashboard() {
    const { user } = useContext(AuthContext);

    const userCanSeeMetrics = useCan({
        roles: ['editor', 'administrator']
    });

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
        <h1>Dashboard, {user?.email}</h1>
        { userCanSeeMetrics && <div>Métricas</div>}
        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupApiClient(ctx);
    const response = apiClient.get('/me');

    return {
        props: {}
    }
})