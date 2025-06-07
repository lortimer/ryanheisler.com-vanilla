import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        name: "API",
        environment: "node",
        include: ["src/**/*test*"],
        exclude: ["src/public/**/*"]
    },
});
