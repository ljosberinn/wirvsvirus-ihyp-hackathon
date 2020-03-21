/**
 * A Partner can be everyone that offers discounts on
 * products a Seeker might need or a Guardian can
 * exchange for Karma points.
 */
export class Partner {
  /**
   * Initializes a new Partner object.
   */
  constructor() {
    /**
     * A unique identifier to access the Partner.
     * @type {string}
     */
    this.id = '';

    /**
     * The partners display name.
     * @type {string}
     */
    this.name = '';

    /**
     * The zip code
     * @type {string}
     */
    this.zip = '';

    /**
     * The street name
     * @type {string}
     */
    this.street = '';

    /**
     * A list of offers the partner provides.
     * @type {*[]}
     */
    this.offers = [];

    /**
     * A list of rewards the partner provides.
     * @type {*[]}
     */
    this.rewards = [];
  }
}
