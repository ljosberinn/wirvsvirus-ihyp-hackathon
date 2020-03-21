/**
 * A Seeker is a person that needs help fulfilling a Task.
 */
export class Seeker {
  /**
   * Initializes a new Seeker object.
   */
  constructor() {
    /**
     * A unique identifier to access the Seeker.
     * @type {string}
     */
    this.id = '';

    /**
     * The first name of the User.
     * @type {string}
     */
    this.name = '';

    /**
     * The postal code where the user is located.
     * @type {string}
     */
    this.zip = '';

    /**
     * The street where the Seeker lives.
     * @type {string}
     */
    this.street = '';

    /**
     * A mail address to contact the Guardian.
     * @type {string}
     */
    this.mail = '';

    /**
     * A telephone number to contact the Guardian.
     * @type {string}
     */
    this.number = '';

    /**
     * True if the Guardian is verified and can start
     * contacting Seekers.
     * @type {boolean}
     */
    this.verified = false;
  }
}
