import { environment } from '../../environments/environment';

const url = environment.production ? 'https://scale-app-nutr.herokuapp.com' : 'http://localhost:3977';

export const GLOBAL = {
  url,
  ip: '127.0.0.1',
  sitekey: '6Ldc-r4UAAAAAPrHF-1D6hcHn8uAkP8G-v5lzm2G',
  secretKey: '6Ldc-r4UAAAAAL4Z7TJgygZOL2-8cMbZlAfjFSji'
};
