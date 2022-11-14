import axios from 'axios'
const { REACT_APP_API_BASE_URI: API } = process.env

export default async function signWithGoogle(user) {
  const { email, displayName, uid, photoURL, emailVerified  } = user
  await axios.post(API + 'login?google=true', {
      id: uid,
      email,
      name: displayName,
      image: photoURL,
      emailVerified,
      password: Math.random() * 1209847 + 'secretoGameScript'
  })
}
