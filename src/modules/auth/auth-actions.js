import firebase from 'firebase';
import Flux from 'flux-state';
import {
  authStore,
  LOGIN_ERROR_EVENT,
  LOGIN_EVENT,
  LOGOUT_EVENT,
  UPDATE_USER_EVENT,
  USER_EVENT,
} from './auth-store';
import { log, error } from 'pure-logger';
import { UserModel } from './auth-models';
import * as R from 'ramda';

/**
 * login with Firebase
 * @param email
 * @param password
 */
export const loginAction = async ({ email, password }) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const AUTH = firebase.auth();
  let data;
  try {
    data = await AUTH.signInWithEmailAndPassword(email, password);
  } catch (e) {
    error('loginAction', e);
    return Flux.dispatchEvent(LOGIN_ERROR_EVENT, new Error(e.message));
  }
  const { user: firebaseUser } = data;
  let user = await fetchUser(firebaseUser.email);
  log('loginAction:fetchUser', user);
  if (user === null) {
    // If the User does not exist, we need to create him
    user = await createUser(firebaseUser);
    log('loginAction:createUser', user);
  }
  Flux.dispatchEvent(LOGIN_EVENT, { user });
  return { user };
};

/**
 * logout with Firebase
 * @return {Promise<void>}
 */
export const logOutAction = async () => {
  const AUTH = firebase.auth();
  await AUTH.signOut();
  Flux.dispatchEvent(LOGOUT_EVENT, {});
};

/**
 * Fetches the User of the Platform
 * @param email The Email of the User
 * @return {Promise<UserModel>} The data of the User or null if does not exist
 */
export const fetchUser = async (email) => {
  const DB = firebase.firestore();
  const usersCollection = DB.collection('users');
  const userRef = usersCollection.doc(email);
  const query = await userRef.get({ source: 'server' });
  log('fetchUser', query);
  if (query.exists) {
    const user = query.data();
    log('fetchUser:data', user);
    Flux.dispatchEvent(USER_EVENT, user);
    log('fetchUser:data', user);
    return user;
  }
  Flux.dispatchEvent(USER_EVENT, null);
  return null;
};

/**
 * Creates a User of the Platform
 * @param firebaseUser The Firebase User
 * @return {Promise<UserModel>} The data of the User or null if does not exist
 */
export const createUser = async (firebaseUser) => {
  const DB = firebase.firestore();
  const usersCollection = DB.collection('users');

  const user = R.clone(UserModel);
  user.email = firebaseUser.email;
  user.id = firebaseUser.uid;

  const userRef = usersCollection.doc(firebaseUser.email);
  await userRef.set(user);
  Flux.dispatchEvent(USER_EVENT, user);
  return user;
};

/**
 * Updates a User of the Platform
 * @param UserModel a User data
 * @return {Promise<UserModel>} The data of the User or null if does not exist
 */
export const updateUser = async ({ firstName, lastName }) => {
  const DB = firebase.firestore();
  const usersCollection = DB.collection('users');
  const user = authStore.getState(USER_EVENT);
  const userRef = usersCollection.doc(user.email);
  const update = { firstName, lastName };
  await userRef.set(update, { merge: true });
  Flux.dispatchEvent(UPDATE_USER_EVENT, { ...user, ...update });
  return user;
};
