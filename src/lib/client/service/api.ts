import { error } from '@sveltejs/kit'
import Cookies from 'js-cookie'

export interface fetchResponse {
  data?: any
  status: number
  status_text: string
  path: string
  ok: boolean
}

async function send( method: string, path: string, data: any | null = null, token: string | null = null ):Promise<fetchResponse> {
	const opts: RequestInit = { method: method, mode:'cors' }
  const optsHeaders: HeadersInit = new Headers()

	if (data) {
    optsHeaders.set('Content-Type', 'application/json')
		opts.body = JSON.stringify(data)
	}
  
  if (token) {
    optsHeaders.set('Authorization', `Bearer ${token}`)
  }

  opts.headers = optsHeaders
	const res = await fetch(`${PUBLIC_BACKEND_URL}${path}`, opts)
  const text = await res.text()
  const jsonData = text ? JSON.parse(text) : {}
  if (res.ok) {
    return {
      data: jsonData,
      status: res.status,
      status_text: res.statusText,
      path: path,
      ok: res.ok
    }
  } else {
    return {
      data: jsonData,
      status: res.status,
      status_text: JSON.stringify(jsonData.detail),
      path: path,
      ok: res.ok
    }
  }
  
}

export async function get(path: string, token: string | null = null) {
  const getResult = await send('GET', path, null, token ?? Cookies.get('codx_token'))
  if (getResult.ok) {
    return getResult.data
  } else {
    error(getResult.status, `${getResult.status_text}. PATH: ${getResult.path}` );
  }
}

export async function getWithoutCredential(path: string) {
  const getResult = await send('GET', path, null, null)
  if (getResult.ok) {
    return getResult.data
  } else {
    error(getResult.status, `${getResult.status_text}. PATH: ${getResult.path}` );
  }
}

export function del(path: string, token: string | null = null) {
	return send('DELETE', path, null, token ?? Cookies.get('codx_token'));
}

export function post(path: string, data?: any, token: string | null = null) {
	return send('POST', path, data, token ?? Cookies.get('codx_token'));
}

export function patch(path: string, data?: any, token: string | null = null) {
	return send('PATCH', path, data, token ?? Cookies.get('codx_token'));
}

export async function download(path: string, token: string | null = null): Promise<fetchResponse> {
  const opts: RequestInit = {method: 'GET', mode: 'cors'}
  const optsHeaders: HeadersInit = new Headers()
  // optsHeaders.set('Response-Type', 'arraybuffer')
  if (token) {
    optsHeaders.set('Authorization', `Bearer ${token}`)
  } else {
    optsHeaders.set('Authorization', `Bearer ${Cookies.get('codx_token')}`)
  }
  opts.headers = optsHeaders
  const res = await fetch(`${PUBLIC_BACKEND_URL}${path}`, opts)
  if (res.ok) {
    const blobFileData = await res.blob()
    return {
      data: blobFileData,
      status: res.status,
      status_text: res.statusText,
      path: path,
      ok: res.ok
    }
  } else {
    const text = await res.text()
    const jsonData = text ? JSON.parse(text) : {}
    return {
      data: jsonData,
      status: res.status,
      status_text: JSON.stringify(jsonData.detail),
      path: path,
      ok: res.ok
    }
  }
}

export async function upload(path: string, data: FormData, token: string | null = null): Promise<fetchResponse> {
  const opts: RequestInit = { method: 'POST', mode:'cors' }
  const optsHeaders: HeadersInit = new Headers()
  opts.body = data
  if (token) {
    optsHeaders.set('Authorization', `Bearer ${token}`)
  } else {
    optsHeaders.set('Authorization', `Bearer ${Cookies.get('codx_token')}`)
  }
  opts.headers = optsHeaders
  const res = await fetch(`${PUBLIC_BACKEND_URL}${path}`, opts)
  const text = await res.text()
  const jsonData = text ? JSON.parse(text) : {}
	if (res.ok) {
		return {
      data: jsonData,
      status: res.status,
      status_text: res.statusText,
      path: path,
      ok: res.ok
    }
	} else {
    return {
      data: jsonData,
      status: res.status,
      status_text: JSON.stringify(jsonData.detail),
      path: path,
      ok: res.ok
    }
  }
}