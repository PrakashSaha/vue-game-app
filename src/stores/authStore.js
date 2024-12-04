import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

export const useAuthStore = defineStore('auth', () => {
  const auth = getAuth();
  const isLoggedIn = ref(false);
  const user = ref(null);
  const error = ref("");

  
  // Login method
  const login = async (email, password) => {
    error.value = ""; // Clear previous errors
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      isLoggedIn.value = true;
    } catch (err) {
      error.value = "Invalid email or password."; // Customize error message
    }
  };

  // Register method
  const register = async ({ name, email, password }) => {
    error.value = ""; // Clear previous errors
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;

      // Update the user profile with name
      await updateProfile(userCredential.user, { displayName: name });
      isLoggedIn.value = true;
    } catch (err) {
        // Handle Firebase specific error codes
        switch (err.code) {
          case 'auth/email-already-in-use':
            error.value = "This email is already registered. Please use a different email.";
            break;
          case 'auth/invalid-email':
            error.value = "The email address is not valid. Please enter a valid email address.";
            break;
          case 'auth/weak-password':
            error.value = "The password is too weak. Please choose a stronger password.";
            break;
          default:
            // For other unknown errors, display a generic message
            error.value = "Registration failed: " + (err.message || "Please try again.");
            break;
        }
    }
  };

  // Logout method
  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      isLoggedIn.value = false;
    } catch (err) {
      error.value = "Logout failed.";
    }
  };

  return { isLoggedIn, user, error, login, register, logout };
});
