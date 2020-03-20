/**
 * An Offer is a product, a Partner can offer Guardians for their Seekers.
 */
export class Offer {
  /**
   * Initializes a new Karma object.
   */
  constructor() {
    /**
     * A unique identifier to access the Offer.
     * @type {string}
     */
    this.id = '';

    /**
     * The skills name.
     * @type {string}
     */
    this.name = '';

    /**
     * A detailed description of the skill.
     * @type {string}
     */
    this.description = '';
  }
}
