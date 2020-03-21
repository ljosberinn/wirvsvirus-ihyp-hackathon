import { BACKEND_KEY } from '../constants/env';

/**
 * Makes an HTTP request using XMLHttpRequest.
 * @param config
 * @returns {Promise<any>}
 */
export async function httpRequest(config) {
  const baseUrl = 'https://api.help-at-home.org';
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        const responseObj = {
          status: http.status,
          statusText: http.statusText,
          response: http.response,
        };
        if (http.status.toString()[0] === '2') {
          if (config.type) {
            responseObj.response = transformResponse(
              http.response,
              config.type,
            );
          }
          resolve(responseObj);
        } else {
          reject(responseObj);
        }
      }
    };
    http.open(config.method, baseUrl + config.path);
    http.setRequestHeader('x-api-key', BACKEND_KEY);
    http.responseType = 'json';
    http.send(config.body ? JSON.stringify(config.body) : undefined);
  });
}

/**
 * Transforms a response
 * @param response
 * @param type
 */
function transformResponse(response, type) {
  if (Array.isArray(response)) {
    return response.map(dto => transformDTO(dto, type));
  } else {
    return transformDTO(response, type);
  }
}

/**
 * Transforms a data transfer object to a type
 * @param dto Data transfer object
 * @param type The object type
 */
function transformDTO(dto, type) {
  const keys = Object.prototype.hasOwnProperty.apply(dto);
  const instance = new type();
  for (const key of keys) {
    instance[key] = dto[key];
  }
  return instance;
}
