/**
 * A Reward is a benefit a Guardian can exchange for Karma
 * at a Partner
 */
export class Reward {
  /**
   * Initializes a new Reward object.
   */
  constructor() {
    /**
     * A unique identifier to access the Reward.
     * @type {string}
     */
    this.id = '';

    /**
     * The rewards type.
     * @type {string}
     */
    this.type = '';

    /**
     * How much the reward costs.
     * @type {number}
     */
    this.karma = 0;

    /**
     * The Rewards name,
     * @type {string}
     */
    this.name = '';

    /**
     * A detailed description for the Reward.
     * @type {string}
     */
    this.description = '';
  }
}
