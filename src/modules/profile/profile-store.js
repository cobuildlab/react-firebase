import Flux from 'flux-state';

/**
 * Event that triggers a LOGIN error
 * @type {string}
 */
export const PROFILE_ERROR_EVENT = 'onProfileErrorEvent';

/**
 * Event that triggers a Profile fetch Event
 * @type {string}
 */
export const PROFILE_EVENT = 'onProfileEvent';

/**
 * Event that triggers a Profile update Event
 * @type {string}
 */
export const UPDATE_PROFILE_EVENT = 'onProfileUpdateEvent';

class ProfileStore extends Flux.DashStore {
  constructor() {
    super();
    this.addEvent(PROFILE_ERROR_EVENT);
    this.addEvent(PROFILE_EVENT);
    this.addEvent(UPDATE_PROFILE_EVENT);
  }
}

const profileStore = new ProfileStore();

export { profileStore };
