import createClient from 'openapi-fetch';
import type { paths } from './onesta';

export const onesta = createClient<paths>({ baseUrl: 'https://testapi.onesta.farm/' });

export type Grower = NonNullable<paths['/v1/growers/']['get']['responses']['200']['content']['application/json']['growers']>[number]
export type Commodity = NonNullable<paths['/v1/commodities/']['get']['responses']['200']['content']['application/json']['commodities']>[number]
