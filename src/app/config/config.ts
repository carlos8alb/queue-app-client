import { environment } from '../../environments/environment';

console.log(environment.production);

const url = environment.production ? 'https://scale-app-nutr.herokuapp.com' : 'http://localhost:3977';

console.log(url);

export const GLOBAL = {
  url,
  ip: '127.0.0.1'
};
