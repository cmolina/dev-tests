import createClient from 'openapi-fetch';
import type { paths } from './onesta';

export const onesta = createClient<paths>({ baseUrl: 'https://testapi.onesta.farm/' });
