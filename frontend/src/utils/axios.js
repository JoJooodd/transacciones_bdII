import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { 'Content-Type': 'application/json' },
});

const KEY = 'client-id';
let cid = sessionStorage.getItem(KEY);
if (!cid) {
    cid = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random();
    sessionStorage.setItem(KEY, cid);
}

api.interceptors.request.use(cfg => {
    cfg.headers['X-Client-Id'] = cid;
    return cfg;
});

export default api;