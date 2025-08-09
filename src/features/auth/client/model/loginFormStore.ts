import { get, writable } from 'svelte/store';
import { AuthApiClient } from '../api';

export const username = writable('');
export const password = writable('');
export const error = writable<string | null>(null);
export const loading = writable(false);

export async function submit() {
	loading.set(true);
	error.set(null);
	try {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		await AuthApiClient.login({ password: get(password), username: get(username) });
	} catch (e) {
		console.error('Login error:', e);
		error.set('Login failed. Please try again.');
	} finally {
		loading.set(false);
	}
}
