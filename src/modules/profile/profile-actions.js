import firebase from 'firebase';
import Flux from 'flux-state';
import { log, error } from 'pure-logger';
// import {UserModel} from './auth-models';
// import * as R from 'ramda';
import { PROFILE_ERROR_EVENT, PROFILE_EVENT, UPDATE_PROFILE_EVENT } from './profile-store';
import { profileValidator } from './profile-validators';
import { authStore, USER_EVENT } from '../auth/auth-store';

/**
 *
 * @param {ProfileModel} profileData
 * @return {Promise<ProfileModel>}
 */
export const updateProfileAction = async (profileData) => {
  log('updateProfileAction', profileData);
  try {
    profileValidator(profileData);
  } catch (e) {
    error('updateProfileAction', e);
    return Flux.dispatchEvent(PROFILE_ERROR_EVENT, e);
  }

  const DB = firebase.firestore();
  const profilesCollection = DB.collection('profiles');
  const user = authStore.getState(USER_EVENT);
  log('updateProfileAction:user', user);
  const profileRef = profilesCollection.doc(user.email);
  const query = await profileRef.get();
  log('updateProfileAction:query', query);
  if (query.exists) {
    const profile = query.data();
    await logProfile(user.email, profile, new Date().getTime());
  }
  await profileRef.set(profileData, { merge: true });
  Flux.dispatchEvent(UPDATE_PROFILE_EVENT, profileData);

  // Update User as no need to update Profile
  const usersCollection = DB.collection('users');
  const userRef = usersCollection.doc(user.email);
  await userRef.set({ needsProfile: false }, { merge: true });
  Flux.dispatchEvent(USER_EVENT, { ...user, ...{ needsProfile: false } });
  return profileData;
};

/**
 *
 * @param email
 * @param profileData
 * @param timestamp
 * @return {Promise<void>}
 */
const logProfile = async (email, profileData, timestamp) => {
  const DB = firebase.firestore();
  const profileLogsCollection = DB.collection('profileLogs');
  const profileLogRef = profileLogsCollection.doc(`${email}:${timestamp}`);
  await profileLogRef.set(profileData);
};

/**
 * Fetches a User Profile
 * @param email The email of the User
 * @return {Promise<ProfileModel>}
 */
export const fetchProfileAction = async (email = null) => {
  const DB = firebase.firestore();
  const profilesCollection = DB.collection('profiles');

  if (email === null) {
    const user = authStore.getState(USER_EVENT);
    email = user.email;
  }
  log('fetchProfileAction:email', email);
  const profileRef = profilesCollection.doc(email);
  const query = await profileRef.get();
  log('fetchProfileAction:query', query);
  let profileData = {};
  if (query.exists) {
    profileData = query.data();
  }
  Flux.dispatchEvent(PROFILE_EVENT, profileData);
  return profileData;
};
