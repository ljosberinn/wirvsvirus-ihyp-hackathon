import { httpRequest } from '../utils/httpRequest';
import { Request } from './entities/Request';

/**
 * Returns all existing requests.
 * @returns {Promise<Request[]>}
 */
export async function getAllRequests() {
  const request = await httpRequest({
    method: 'GET',
    path: '/requests',
    type: Request,
  });
  return request.response;
}

/**
 * Returns a single request by id
 * @param id
 * @returns {Promise<Request>}
 */
export async function getRequest(id) {
  const request = await httpRequest({
    method: 'GET',
    path: `/requests/${id}`,
    type: Request,
  });
  return request.response;
}

/**
 * Deletes a single request
 * @param id
 * @returns {Promise<void>}
 */
export async function deleteRequest(id) {
  await httpRequest({
    method: 'DELETE',
    path: `/requests/${id}`,
  });
}

/**
 * Creates a new request
 * @param request
 * @returns {Promise<Request>}
 */
export async function createRequest(request) {
  const r = await httpRequest({
    method: 'POST',
    path: `/requests`,
    body: request,
    type: Request,
  });
  return r.response;
}

/**
 * Updates an existing request
 * @param id
 * @param request
 * @returns {Promise<void>}
 */
export async function updateRequest(id, request) {
  await httpRequest({
    method: 'POST',
    path: `/requests/{id}`,
    body: request,
  });
}
