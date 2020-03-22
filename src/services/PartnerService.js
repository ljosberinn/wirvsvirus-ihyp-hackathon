import { httpRequest } from '../utils/httpRequest';
import { Partner } from './entities/Partner';

/**
 * Returns all existing partner.
 * @returns {Promise<Partner[]>}
 */
export async function getAllPartner() {
  const request = await httpRequest({
    method: 'GET',
    path: '/partner',
    type: Partner,
  });
  return request.response;
}

/**
 * Returns a single partner by id
 * @param id
 * @returns {Promise<Partner>}
 */
export async function getPartner(id) {
  const request = await httpRequest({
    method: 'GET',
    path: `/partner/${id}`,
    type: Partner,
  });
  return request.response;
}

/**
 * Deletes a single partner
 * @param id
 * @returns {Promise<void>}
 */
export async function deletePartner(id) {
  await httpRequest({
    method: 'DELETE',
    path: `/partner/${id}`,
  });
}

/**
 * Creates a new partner
 * @param partner
 * @returns {Promise<Partner>}
 */
export async function createPartner(partner) {
  const request = await httpRequest({
    method: 'POST',
    path: `/partner`,
    body: partner,
    type: Partner,
  });
  return request.response;
}

/**
 * Updates an existing partner
 * @param id
 * @param partner
 * @returns {Promise<void>}
 */
export async function updatePartner(id, partner) {
  await httpRequest({
    method: 'PATCH',
    path: `/partner/{id}`,
    body: partner,
  });
}
