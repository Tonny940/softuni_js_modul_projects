import { deleteOffer, getOfferById } from '../api/games.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (offer, isOwner, userData, onDelete, onClick) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="./images/example2.png" alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">1</strong></p>

        ${isOwner ? html`<div id="action-buttons">
            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} id="delete-btn">Delete</a>
        </div>`
        : ''}

        ${!isOwner && userData != null
        ? html`<a @click=${onClick} id="apply-btn">Apply</a>`
        : ''}
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const offer = await getOfferById(ctx.params.id)
    const userData = getUserData()

    const isOwner = userData?._id == offer._ownerId
    ctx.render(detailsTemplate(offer, isOwner, userData, onDelete, onClick));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this game?');
        if (choice) {
            await deleteOffer(ctx.params.id)
            ctx.page.redirect('/dashboard')
        }
    }
    function onClick(event) {
        event.preventDefault();
        document.getElementById('apply-btn').style.display = 'none'
    }
}

const bonus = html`
<!--Bonus - Only for logged-in users ( not authors )-->
<a href="" id="apply-btn">Apply</a>`