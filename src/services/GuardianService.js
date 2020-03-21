import { httpRequest } from '../utils/httpRequest';
import { Guardian } from './entities/Guardian';

/**
 * Returns all existing guardians.
 * @return {Promise<Guardian[]>}
 */
export async function getAllGuardians() {
  const request = await httpRequest({
    method: 'GET',
    path: '/api/guardians',
    type: Guardian,
  });
  return request.response;
}

/**
 * Returns a single guardian by id
 * @param id
 * @returns {Promise<Guardian>}
 */
export async function getGuardian(id) {
  const request = await httpRequest({
    method: 'GET',
    path: `/api/guardians/${id}`,
    type: Guardian,
  });
  return request.response;
}

/**
 * Deletes a single guardian
 * @param id
 * @returns {Promise<void>}
 */
export async function deleteGuardian(id) {
  await httpRequest({
    method: 'DELETE',
    path: `/api/guardians/${id}`,
  });
}

/**
 * Creates a new guardian
 * @param guardian
 * @returns {Promise<Guardian>}
 */
export async function createGuardian(guardian) {
  const request = await httpRequest({
    method: 'POST',
    path: `/api/guardians`,
    body: guardian,
    type: Guardian,
  });
  return request.response;
}

/**
 * Updates an existing guardian
 * @param id
 * @param guardian
 * @returns {Promise<void>}
 */
export async function updateGuardian(id, guardian) {
  await httpRequest({
    method: 'POST',
    path: `/api/guardians/{id}`,
    body: guardian,
  });
}
