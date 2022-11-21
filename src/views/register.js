import { register } from '../api/users.js';
import { updateNav } from '../app.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const registerTemplate = (onSubmit) => html`
<!-- Register Page (Only for Guest users) -->
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onSubmit}class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>
`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}
async function onSubmit(ctx, data, event) {
    // TODO: Check what is inside DATA

    if (data.email == '' || data.password == '') {
        return alert('All fields are required!');
    }
    if (data.password != data['re-password']) {
        return alert('Passwords do not match!');
    }
    await register(data.email, data.password);
    event.target.reset();
    updateNav()
    ctx.page.redirect('/dashboard');
};
