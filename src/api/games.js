import { get, post, del, put } from "./api.js";


export async function getDishboard() {
    return get('/data/offers?sortBy=_createdOn%20desc')
};

export async function createOffer(offerDetails) {
    return post('/data/offers', offerDetails);
}

export async function getOfferById(id) {
    return get('/data/offers/' + id);
};

export async function deleteOffer(id) {
    return del('/data/offers/' + id);
}

export function updateOffer(id, offer) {
    return put('/data/offers/' + id, offer);
}