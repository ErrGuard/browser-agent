export type CreateEventPayload = {
	error: { message: string; filename?: string; lineno?: number; colno?: number };
};

export function createEvent(payload: CreateEventPayload) {
	const url = `${import.meta.env.VITE_API_BASE_URL ?? 'https://errguard.app'}/api/v1/events`;

	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});
}
