import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/browser.ts'),
			name: 'ErrGuard',
			fileName: 'errguard.browser',
			formats: ['iife']
		}
	}
});
