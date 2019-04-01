import Flux from 'flux-state';

/**
 * Event that triggers a LOGIN error
 * @type {string}
 */
export const LOGIN_ERROR_EVENT = 'onLoginErrorEvent';

/**
 * Event that triggers a User fetch Event
 * @type {string}
 */
export const USER_EVENT = 'onUserEvent';

/**
 * Event that triggers a User update Event
 * @type {string}
 */
export const UPDATE_USER_EVENT = 'onUpdateUserEvent';

/**
 * Event that triggers when a user Logs in
 * @type {string}
 */
export const LOGIN_EVENT = 'onLoginEvent';

/**
 * Event that triggers when a user Logs out
 * @type {string}
 */
export const LOGOUT_EVENT = 'onLogoutEvent';

class AuthStore extends Flux.DashStore {
  constructor() {
    super();
    this.addEvent(LOGOUT_EVENT);
    this.addEvent(LOGIN_EVENT);
    this.addEvent(LOGIN_ERROR_EVENT);
    this.addEvent(USER_EVENT);
    this.addEvent(UPDATE_USER_EVENT);
  }
}

const authStore = new AuthStore();

export { authStore };
