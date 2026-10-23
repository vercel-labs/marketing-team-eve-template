import { askQuestion } from "eve/tools/ask_question";

/**
 * Lets the model ask the user one question and wait for the answer.
 *
 * @remarks
 * eve dropped `ask_question` from the default tool set, so it is added back here explicitly. Slack
 * renders the options as a native select, and the user can always type their own answer instead. In
 * a subagent the question is relayed to the person on the root channel. Delete this file to have
 * the agent ask in its reply text instead.
 *
 * @see {@link https://eve.dev/docs/concepts/built-in-tools | Built-in tools}
 */
export default askQuestion();
