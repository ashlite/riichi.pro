import { invalidateAll } from "$app/navigation";
import { signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebaseAuth, googleProvider } from "client-service/firebase";

export async function loginUser() {
  try {
    const signResult = await signInWithPopup(firebaseAuth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(signResult)
    const credentialSignIn = await signInWithCredential(firebaseAuth, credential!)
    const loginApp = await fetch('/api/v1/public/login', {
      method: 'POST',
      body: await credentialSignIn.user.getIdToken()
    })
    const loginResult = await loginApp.json()
    if (loginResult.header.ok) {
      toastAlert.success('Login Success')
      invalidateAll()
    } else {
      toastAlert.responseError(loginResult)
    }
  } catch (e: any) {
    console.log(e)
    toastAlert.error(`ERROR ${e.code}, ${e.message}`)
  }
}