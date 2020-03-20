/**
 * Makes an HTTP request using XMLHttpRequest.
 * @param config
 * @returns {Promise<T>}
 */
export async function httpRequest(config) {
  const baseUrl = 'https://localhost:8080';
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
          resolve(responseObj);
        } else {
          reject(responseObj);
        }
      }
    };
    http.open(config.method, baseUrl + config.path);
    const token = getCookie('auth');
    if (token) {
      http.setRequestHeader('x-api-key', token);
    }
    http.responseType = 'json';
    http.send(config.body ? JSON.stringify(config.body) : undefined);
  });
}

/**
 * Returns a cookie by name
 * @param name
 * @returns {string}
 */
function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2)
    return parts
      .pop()
      .split(';')
      .shift();
}
