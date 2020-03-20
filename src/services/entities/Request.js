/**
 * A Request is a task a Seeker needs fulfilled by a Guardian.
 */
export class Request {
  /**
   * Initializes a new Request object.
   */
  constructor() {
    /**
     * A unique identifier to access the Partner.
     * @type {string}
     */
    this.id = '';

    /**
     * The type of request the Seeker has.
     * @type {string}
     */
    this.type = '';

    /**
     * The Guardian that processes the Request.
     * @type {string}
     */
    this.processor = '';

    /**
     * The seeker that created the request.
     * @type {string}
     */
    this.seeker = '';

    /**
     * The current Request status.
     * @type {string}
     */
    this.status = '';

    /**
     * The messages a Seeker sent the Guardian.
     * @type {string}
     */
    this.message = [];

    /**
     * The creation Date of the Request.
     * @type {string}
     */
    this.date = '';
  }
}
