import { spawn } from "node:child_process";
import type { ServerResponse } from "node:http";
import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";

const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: "webflow-sync-dev",
      configureServer(server) {
        server.middlewares.use("/__hub/sync-webflow", (request, response) => {
          if (request.method !== "POST") {
            response.statusCode = 405;
            response.end();
            return;
          }
          runWebflowSync(server, response);
        });
      },
    },
    {
      name: "prefix-public-css-urls",
      transform(code, id) {
        if (!id.endsWith("tokens.css")) return;
        const prefix = base.replace(/\/$/, "");
        return code.replaceAll('url("/', `url("${prefix}/`);
      },
    },
  ],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    allowedHosts: ["playson-power-pack-salesdeck", "playson-resource-hub"],
  },
});

function runWebflowSync(server: ViteDevServer, response: ServerResponse) {
  const child = spawn(process.execPath, ["scripts/sync-webflow.mjs"], {
    cwd: server.config.root,
    env: process.env,
  });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk: Buffer) => {
    stdout += chunk.toString();
  });
  child.stderr.on("data", (chunk: Buffer) => {
    stderr += chunk.toString();
  });
  child.on("close", (code) => {
    response.setHeader("content-type", "application/json");
    if (code === 0) {
      response.end(stdout || JSON.stringify({ ok: true }));
      return;
    }
    response.statusCode = code === 2 ? 503 : 500;
    response.end(JSON.stringify({ ok: false, message: stderr.trim() || "Sync failed" }));
  });
}
