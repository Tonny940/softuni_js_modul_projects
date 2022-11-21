import { login } from '../api/users.js';
import { updateNav } from '../app.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>
`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));

    async function onSubmit(ctx, data, event) {
        if (data.email == '' || data.password == '') {
            return alert('All fields are required!');

        }
        await login(data.email, data.password);
        event.target.reset();
        updateNav()
        ctx.page.redirect('/dashboard ');
    };
}