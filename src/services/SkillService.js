import { httpRequest } from '../utils/httpRequest';

/**
 * Returns all existing skills.
 * @returns {Promise<Skill[]>}
 */
export async function getAllSkills() {
  const request = await httpRequest({
    method: 'GET',
    path: '/api/skills',
  });
  return request.response;
}

/**
 * Returns a single skill by id
 * @param id
 * @returns {Promise<Skill>}
 */
export async function getSkill(id) {
  const request = await httpRequest({
    method: 'GET',
    path: `/api/skills/${id}`,
  });
  return request.response;
}

/**
 * Deletes a single skill
 * @param id
 * @returns {Promise<void>}
 */
export async function deleteSkill(id) {
  await httpRequest({
    method: 'DELETE',
    path: `/api/skills/${id}`,
  });
}

/**
 * Creates a new skill
 * @param skill
 * @returns {Promise<Skill>}
 */
export async function createSkill(skill) {
  const request = await httpRequest({
    method: 'POST',
    path: `/api/skills`,
    body: skill,
  });
  return request.response;
}

/**
 * Updates an existing skill
 * @param id
 * @param skill
 * @returns {Promise<void>}
 */
export async function updateSkill(id, skill) {
  await httpRequest({
    method: 'POST',
    path: `/api/skills/{id}`,
    body: skill,
  });
}
