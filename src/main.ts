import { type CreateEventPayload, createEvent } from './api';

(function () {
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

	window.addEventListener('error', async ({ message, filename, lineno, colno }) => {
		try {
			await createEvent({
				error: { message, filename, lineno, colno }
			});
		} catch (err) {
			console.error('failed to push event: ', err);
		}
	});

	window.addEventListener('unhandledrejection', async (ev) => {
		try {
			await createEvent(transformUnhandledRejection(ev));
		} catch (err) {
			console.error('failed to push event: ', err);
		}
	});
})();
