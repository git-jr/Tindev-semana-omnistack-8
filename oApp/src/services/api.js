import axios from 'axios'

const seuIP = 'http://...';

const api = axios.create({
    
    baseURL: seuIP

});

export default api