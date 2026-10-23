import { disableTool } from "eve/tools";

/**
 * Removes the default-harness `bash` from this specialist.
 *
 * @remarks
 * This agent does its own web research, and left with a shell it reaches for `curl` plus inline
 * Python to pull raw HTML into the sandbox and regex it apart. That path costs several times what
 * `web_fetch` does, since unconverted markup lands in context and one source takes several round
 * trips. Removing the shell leaves `web_fetch`, which returns converted markdown in a single call
 * that the source budget in `instructions.md` can actually count.
 *
 * The file tools (`read_file`, `write_file`) stay: they reach the sandbox
 * filesystem, which is how this agent reads its own skills' `references/` files, and with no shell
 * there is no way to put a fetched page there.
 *
 * @see {@link https://eve.dev/docs/concepts/default-harness | Default harness}
 */
export default disableTool();
