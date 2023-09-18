import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { db } from 'service/db.js';
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
    if (password != password2) {return fail(422, {troubledPart:"password"})}
    else if (regPass.test(password!.toString())) {return fail(422, {troubledPart:"password"})}
    else {
      try {
        const result = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        console.log(result)
        await db.user.create({
          data: {
            countryCode: countryCode,
            email: email,
            firstName: firstName,
            lastName: lastName,
            firebaseId: result.user.uid,
            roleId: 101
          }
        })
        return {success: true}
      } catch(e) {
        return fail(500, {message : e})
      }
    }
	}
};