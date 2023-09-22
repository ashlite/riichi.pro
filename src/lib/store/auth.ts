import cookie from "cookie";
import { browser } from "$app/environment";
// import { GoogleAuthProvider, type User, signInWithRedirect, signInWithEmailAndPassword} from "firebase/auth";
import { writable } from "svelte/store";
import { firebaseAuth } from "service/firebase";

export const user = writable<User | null>(null);

export async function signOut() {
  return firebaseAuth.signOut();
}

// export async function signIn(type: 'emailPass' | 'google', email: string, pass: string) {
//   switch(type) {
//     case "emailPass":
//       await signInWithEmailAndPassword(firebaseAuth, email, pass)
//       break
//     case "google":
//       await signInWithRedirect(firebaseAuth, new GoogleAuthProvider());
//       break
//   }
// }

if (browser) {
  firebaseAuth.onIdTokenChanged(async (newUser) => {
    const tokenCurrentlySet =
      cookie.parse(document.cookie)["kaze_token"] !== undefined;
    const token = newUser ? await newUser?.getIdToken() : undefined;
    document.cookie = cookie.serialize("kaze_token", token ?? "", {
      path: "/",
      maxAge: token ? undefined : 0,
    });
    user.set(newUser);

    if (!tokenCurrentlySet && token) {
      document.location.reload();
    }
  });

  // refresh the ID token every 10 minutes
  setInterval(async () => {
    if (firebaseAuth.currentUser) {
      await firebaseAuth.currentUser.getIdToken(true);
    }
  }, 10 * 60 * 1000);
}