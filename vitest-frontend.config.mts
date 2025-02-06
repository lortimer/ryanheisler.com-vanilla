import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        name: "UI",
        setupFiles: ["./vitest-setup.ts"],
        environment: "jsdom",
        include: ["src/public/**/*.test.ts"],
        // env: { BASE_URL: "example" }           Set environment variables for test. can set with .env file for parcel
    },
});
