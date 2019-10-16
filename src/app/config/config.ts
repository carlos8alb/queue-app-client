import { environment } from '../../environments/environment';

const url = environment.production ? 'https://scale-app-nutr.herokuapp.com' : 'http://localhost:3977';

export const GLOBAL = {
  url,
  ip: '127.0.0.1'
};
