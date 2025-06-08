import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        projects: [
            "vitest-frontend.config.mts",
            "vitest-api.config.mts",
        ]
    },
});