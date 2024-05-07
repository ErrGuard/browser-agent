import { type CreateEventPayload, createEvent } from './api';

window.addEventListener('error', ({ message, filename, lineno, colno }) => {
	createEvent({
		error: { message, filename, lineno, colno }
	});
});

window.addEventListener('unhandledrejection', (ev) => {
	createEvent(transformUnhandledRejection(ev));
});

function transformUnhandledRejection(ev: PromiseRejectionEvent): CreateEventPayload {
	if (ev.reason instanceof Error) {
		return {
			error: { message: ev.reason.message }
		};
	} else if (typeof ev.reason === 'string') {
		return {
			error: { message: ev.reason }
		};
	}

	return {
		error: {
			message: 'Unhandled promise rejection'
		}
	};
}
