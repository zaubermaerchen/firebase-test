import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isLoggedIn = () => user.value !== null

  const logIn = async() => {
    const response = await signInWithPopup(auth, provider);
    user.value = response.user;
  }

  const logOut = async() => {
    await signOut(auth);
    user.value = null;
  }

  let isInitialize = false;
  const initialize = async() => {
    if (isInitialize) {
      return
    }
    return new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (_user) => {
        user.value = _user;
        isInitialize = true;
        resolve();
      })
    });
  }

  return {
    isLoggedIn,
    logIn,
    logOut,
    initialize,
  }
});
