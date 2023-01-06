import axios from "axios";
import env from "react-dotenv";

console.log('ENVIRONMENT: ', env?.APP_ENV);

// Axios base URL
axios.defaults.baseURL = env?.API_URL || "https://oyster-app-6qwcw.ondigitalocean.app/api/";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


