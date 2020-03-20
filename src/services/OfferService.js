import { httpRequest } from '../utils/httpRequest';

/**
 * Returns all existing offers.
 * @return Promise<Offer[]>
 */
export async function getAllOffers() {
  const request = await httpRequest({
    method: 'GET',
    path: '/api/offers',
  });
  return request.response;
}

/**
 * Returns a single offer by id
 * @param id
 * @returns {Promise<Offer>}
 */
export async function getOffer(id) {
  const request = await httpRequest({
    method: 'GET',
    path: `/api/offers/${id}`,
  });
  return request.response;
}

/**
 * Deletes a single offer
 * @param id
 * @returns {Promise<void>}
 */
export async function deleteOffer(id) {
  await httpRequest({
    method: 'DELETE',
    path: `/api/offers/${id}`,
  });
}

/**
 * Creates a new offer
 * @param offer
 * @returns {Promise<Offer>}
 */
export async function createOffer(offer) {
  const request = await httpRequest({
    method: 'POST',
    path: `/api/offers`,
    body: offer,
  });
  return request.response;
}

/**
 * Updates an existing offer
 * @param id
 * @param offer
 * @returns {Promise<void>}
 */
export async function updateOffer(id, offer) {
  await httpRequest({
    method: 'POST',
    path: `/api/offers/{id}`,
    body: offer,
  });
}
