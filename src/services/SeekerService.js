import { httpRequest } from '../utils/httpRequest';
import { Seeker } from './entities/Seeker';

/**
 * Returns all existing seeker.
 * @returns {Promise<Seeker>}
 */
export async function getAllSeeker() {
  const request = await httpRequest({
    method: 'GET',
    path: '/seeker',
    type: Seeker,
  });
  return request.response;
}

/**
 * Returns a single seeker by id
 * @param id
 * @returns {Promise<Seeker>}
 */
export async function getSeeker(id) {
  const request = await httpRequest({
    method: 'GET',
    path: `/seeker/${id}`,
    type: Seeker,
  });
  return request.response;
}

/**
 * Deletes a single seeker
 * @param id
 * @returns {Promise<void>}
 */
export async function deleteSeeker(id) {
  await httpRequest({
    method: 'DELETE',
    path: `/seeker/${id}`,
  });
}

/**
 * Creates a new seeker
 * @param seeker
 * @returns {Promise<Seeker>}
 */
export async function createSeeker(seeker) {
  const request = await httpRequest({
    method: 'POST',
    path: `/seeker`,
    body: seeker,
    type: Seeker,
  });
  return request.response;
}

/**
 * Updates an existing seeker
 * @param id
 * @param seeker
 * @returns {Promise<void>}
 */
export async function updateSeeker(id, seeker) {
  await httpRequest({
    method: 'PATCH',
    path: `/seeker/{id}`,
    body: seeker,
  });
}
