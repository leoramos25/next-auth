import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { setupApiClient } from '../services/api';
import { api } from '../services/apiClient';

import { withSSRAuth } from '../utils/withSSRAuth';
import { Can } from '../components/Can';

export default function Dashboard() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <h1>Dashboard, {user?.email}</h1>
            <Can permissions={['metrics.list']}>
                <div>Métricas</div>
            </Can>
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