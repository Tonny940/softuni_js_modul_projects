import { getOfferById, updateOffer } from '../api/games.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const editTemplate = (onSubmit, offer) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl}/>
            <input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category}/>
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50" .value=${offer.description}></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50" .value=${offer.requirements}></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary}/>

            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export async function editPage(ctx) {
    // TODO Check what is inside of itemById
    const offer = await getOfferById(ctx.params.id)
    ctx.render(editTemplate(createSubmitHandler(ctx, onSubmit), offer));

    async function onSubmit(ctx, data, event) {
        if (data.category == '' ||
        data.description == '' ||
        data.imageUrl == '' ||
        data.requirements == '' ||
        data.salary == '' ||
        data.title == '') {
            return alert('All fields are required!');
        }
        const offerInfo = {
            title: data.title,
            imageUrl: data.imageUrl,
            category: data.category,
            description: data.description,
            requirements: data.requirements,
            salary: data.salary
        }
        await updateOffer(ctx.params.id, offerInfo)

        event.target.reset();
        // TODO: Change redirection!
        ctx.page.redirect('/details/' + ctx.params.id);
    };
}