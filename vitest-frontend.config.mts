import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        name: "UI",
        setupFiles: ["./vitest-setup.ts"],
        environment: "jsdom",
        include: ["src/public/**/*.test.ts"], // make this point at .test-dist, make sure test files get transpiled and copied there
        // env: { BASE_URL: "example" }           Set environment variables for test. can set with .env file for parcel
    },
});
