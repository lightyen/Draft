declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: "development" | "production"
		readonly PUBLIC_URL: string
		readonly TAILWIND_CONFIG: string
	}
}
