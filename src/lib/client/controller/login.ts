import { invalidateAll } from "$app/navigation";
import { signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebaseAuth, googleProvider } from "client-service/firebase";
import { type ToastStore } from "@skeletonlabs/skeleton";

export async function loginUser(toastStore: ToastStore) {
  try {
    const signResult = await signInWithPopup(firebaseAuth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(signResult)
    const credentialSignIn = await signInWithCredential(firebaseAuth, credential!)
    const loginApp = await fetch('/api/v1/public/login', {
      method: 'POST',
      body: await credentialSignIn.user.getIdToken()
    })
    const loginResult = await loginApp.json()
    if (loginApp.ok) {
      toastStore.trigger({
        message: 'Login Success',
        timeout: 3000,
        background: "variant-filled-success"
      })
      invalidateAll()
    } else {
      toastStore.trigger({
        message: `Error: ${loginResult.header.status}. ${loginResult.header.statusText}`,
        timeout: 6000,
        background: "variant-filled-error"
      })
    }
  } catch (e: any) {
    toastStore.trigger({
      message: `Error: ${e.code}. ${e.message}`,
      timeout: 6000,
      background: "variant-filled-error"
    })
  }
}