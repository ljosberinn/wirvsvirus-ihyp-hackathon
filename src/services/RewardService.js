import { httpRequest } from '../utils/httpRequest';

/**
 * Returns all existing rewards.
 * @returns {Promise<Reward[]>}
 */
export async function getAllRewards() {
  const request = await httpRequest({
    method: 'GET',
    path: '/api/rewards',
  });
  return request.response;
}

/**
 * Returns a single reward by id
 * @param id
 * @returns {Promise<Reward>}
 */
export async function getReward(id) {
  const request = await httpRequest({
    method: 'GET',
    path: `/api/rewards/${id}`,
  });
  return request.response;
}

/**
 * Deletes a single reward
 * @param id
 * @returns {Promise<void>}
 */
export async function deleteReward(id) {
  await httpRequest({
    method: 'DELETE',
    path: `/api/rewards/${id}`,
  });
}

/**
 * Creates a new reward
 * @param reward
 * @returns {Promise<Reward>}
 */
export async function createReward(reward) {
  const r = await httpRequest({
    method: 'POST',
    path: `/api/rewards`,
    body: reward,
  });
  return r.response;
}

/**
 * Updates an existing reward
 * @param id
 * @param reward
 * @returns {Promise<void>}
 */
export async function updateReward(id, reward) {
  await httpRequest({
    method: 'POST',
    path: `/api/rewards/{id}`,
    body: reward,
  });
}
