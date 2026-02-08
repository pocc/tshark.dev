export interface Env {
	ASSETS: Fetcher;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// Future API routes go here:
		// if (url.pathname.startsWith("/api/")) {
		//   return handleApi(request, env);
		// }

		// Serve static assets from Hugo's public/ directory
		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;
