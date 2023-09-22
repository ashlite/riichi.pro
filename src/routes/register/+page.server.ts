import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from 'service/firebase';

const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g

// let success: boolean | undefined = undefined;

export const actions = {
	registerEmailPass: async ({request}) => {
		const data = await request.formData()
    const password = data.get('pass')!.toString()
    const password2 = data.get('passCompare')!.toString()
    const email = data.get('email')!.toString()
    const countryCode = data.get('country')!.toString()
    const firstName = data.get('firstName')!.toString()
    const lastName = data.get('lastName')!.toString()

    //test password
    if (password != password2) {return fail(422, {message:"password doesn't match"})}
    else if (regPass.test(password!.toString())) {return fail(422, {troubledPart:"wrong password format"})}
    else {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password)
      await db.user.create({
        data: {
          countryCode: countryCode,
          email: email,
          firstName: firstName,
          lastName: lastName,
          firebaseId: result.user.uid,
          roleId: 101,
          emailVerified: result.user.emailVerified
        }
      })
      throw redirect(303, '/app')
    }
	}
};