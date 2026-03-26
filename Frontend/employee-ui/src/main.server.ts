import 'zone.js/node';   // ✅ REQUIRED for SSR
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server';
import * as https from 'https';

// Development-only: patch global fetch to supply an HTTPS agent that
// ignores self-signed certificate errors. This avoids setting the
// insecure `NODE_TLS_REJECT_UNAUTHORIZED=0` environment variable and
// prevents the Node warning while keeping the change scoped to the
// process at runtime.
if (process.env && process.env['NODE_ENV'] !== 'production') {
    try {
        const originalFetch = (globalThis as any).fetch;
        if (originalFetch && typeof originalFetch === 'function') {
            const devAgent = new https.Agent({ rejectUnauthorized: false });
            (globalThis as any).fetch = (input: RequestInfo, init?: RequestInit) => {
                init = init || {};
                // If caller already provided an agent, keep it; otherwise use devAgent
                (init as any).agent = (init as any).agent ?? devAgent;
                return originalFetch(input, init as any);
            };
        }
    } catch (e) {
        // If patching fails, fall back to default behavior and log for diagnostics
        // Do not change global TLS behavior here.
        // eslint-disable-next-line no-console
        console.warn('Failed to patch global fetch for dev HTTPS agent:', e);
    }
}

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(AppComponent, config, context);

export default bootstrap;
