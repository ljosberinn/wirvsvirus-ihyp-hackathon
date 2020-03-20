/**
 * A Skill is a task a Guardian can offer.
 */
export class Skill {
  /**
   * Initializes a new Skill object.
   */
  constructor() {
    /**
     * A unique identifier to access the Skill.
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

    /**
     * How much karma the Guardian gets when
     * successfully completing the task.
     * @type {number}
     */
    this.karma = 0;

    /**
     * The skills type.
     * @type {string}
     */
    this.type = '';
  }
}
