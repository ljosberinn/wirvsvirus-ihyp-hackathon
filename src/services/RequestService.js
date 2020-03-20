import { httpRequest } from '../utils/httpRequest';

/**
 * Returns all existing requests.
 * @returns {Promise<Request[]>}
 */
export async function getAllRequests() {
  const request = await httpRequest({
    method: 'GET',
    path: '/api/requests',
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
    path: `/api/requests/${id}`,
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
    path: `/api/requests/${id}`,
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
    path: `/api/requests`,
    body: request,
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
    path: `/api/requests/{id}`,
    body: request,
  });
}
