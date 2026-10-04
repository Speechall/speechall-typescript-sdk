const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

async function main() {
    // Keep the extracted package beneath the repository so it can resolve the
    // same installed runtime dependencies as a consumer installation.
    const directory = fs.mkdtempSync(path.join(process.cwd(), ".package-smoke-"));
    try {
        const packed = JSON.parse(execFileSync("npm", ["pack", "--json", "--ignore-scripts", "--cache", path.join(directory, "cache"), "--pack-destination", directory], { encoding: "utf8" }));
        execFileSync("tar", ["-xzf", path.join(directory, packed[0].filename), "-C", directory]);
        const packageDirectory = path.join(directory, "package");
        const metadata = JSON.parse(fs.readFileSync(path.join(packageDirectory, "package.json"), "utf8"));
        assert.ok(fs.statSync(path.join(packageDirectory, metadata.main)).isFile(), "JavaScript entrypoint must be packaged");
        assert.ok(fs.statSync(path.join(packageDirectory, metadata.types)).isFile(), "TypeScript declarations must be packaged");
        const commonJs = require(packageDirectory);
        assert.equal(typeof commonJs.SpeechallClient, "function");
        const esm = await import(pathToFileURL(path.join(packageDirectory, metadata.main)).href);
        assert.equal(typeof esm.SpeechallClient, "function");
        console.log("Packed SDK includes JavaScript and declarations; CommonJS and ESM imports pass.");
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
