import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        name: "UI",
        setupFiles: ["./vitest-setup.ts"],
        environment: "jsdom",
        include: ["src/public/**/*.test.ts"],
    },
});
