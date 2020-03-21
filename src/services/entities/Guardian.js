/**
 * A Guardian is a person that offers help to a Seeker.
 * It holds all information to identify and locate the user.
 */
export class Guardian {
  /**
   * Initializes a new Guardian object.
   */
  constructor() {
    /**
     * A unique identifier to access the Guardian.
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
     * The Guardians karma points.
     * @type {number}
     */
    this.karma = 0;

    /**
     * A set of skills the Guardian offers.
     * Examples are: shopping, care taking, working
     * @type {*[]}
     */
    this.skills = [];

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

    /**
     * An image of the Guardian.
     * @type {string}
     */
    this.avatar = '';
  }
}
