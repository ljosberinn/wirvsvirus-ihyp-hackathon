import { httpRequest } from '../utils/httpRequest';
import { Offer } from './entities/Offer';

/**
 * Returns all existing offers.
 * @return {Promise<Offer[]>}
 */
export async function getAllOffers() {
  const request = await httpRequest({
    method: 'GET',
    path: '/offers',
    type: Offer,
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
    path: `/offers/${id}`,
    type: Offer,
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
    path: `/offers/${id}`,
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
    path: `/offers`,
    body: offer,
    type: Offer,
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
    path: `/offers/{id}`,
    body: offer,
  });
}
