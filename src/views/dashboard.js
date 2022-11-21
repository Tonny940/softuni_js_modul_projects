import { getDishboard } from '../api/games.js';
import { html } from '../lib.js';

const dashboardTemplate = (offers) => html`
<section id="dashboard">
    <h2>Job Offers</h2>

    ${offers.length == 0 
    ? html` <h2>No offers yet.</h2>`
    : offers.map(offerCard)}
   
</section>
`;

const offerCard = (offer) => html`
    <div class="offer">
    <img src=${offer.imageUrl} alt="example1" />
    <p>
        <strong>Title: </strong><span class="title">${offer.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
    <a class="details-btn" href="/details/${offer._id}">Details</a>
    </div>
    `

export async function dashboardPage(ctx) {
    const offers = await getDishboard()
    ctx.render(dashboardTemplate(offers));
}