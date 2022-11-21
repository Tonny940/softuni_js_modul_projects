import { updateNav } from '../app.js';
import { clearUserData, setUserData } from '../utils.js';
import { get, post } from './api.js';


export async function login(email, password) {
    const result = await post('/users/login', { email, password });
    setUserData(result);
    return result
};

export async function register(email, password) {
    const result = await post('/users/register', { email, password });
    setUserData(result);
    return result;
};

export function logout(ctx) {
    get('/users/logout');
    clearUserData();
    updateNav()
    ctx.page.redirect('/dashboard')
};
