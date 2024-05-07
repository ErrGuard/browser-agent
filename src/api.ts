export type CreateEventPayload = {
	error: { message: string; filename?: string; lineno?: number; colno?: number };
};

export function createEvent(payload: CreateEventPayload) {
	return fetch('http://localhost:5174/api/v1/events', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});
}
