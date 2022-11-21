import { logout } from './api/users.js';
import { page, render } from './lib.js';
import { getUserData } from './utils.js';
import { dashboardPage } from './views/dashboard.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';


// TODO: Find and take MAIN element from HTML
const main = document.getElementById('mainPage');
const p = document.createElement('p');
p.textContent = 'HI'
main.appendChild(p);
page(decorateContext);

page('/', homePage);
page('/dashboard', dashboardPage);
page('/create', createPage);
page('/register', registerPage);
page('/login', loginPage);
page('/logout', logout);

page('/details/:id', detailsPage);
page('/edit/:id',editPage);

updateNav()
page.start();


function renderMain(templateResult) {
    render(templateResult, main);
};

function decorateContext(ctx, next) {
    ctx.render = renderMain;

    next();
};

export function updateNav() {
    const userData = getUserData();
    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';

    }
}