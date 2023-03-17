import { Message, completeChat } from "./llm.ts";
import { mod, resolve } from "./deps.ts";

const envPath = resolve(`${Deno.env.get("HOME")}/.chatgpt.env`);

const { OPENAI_API_KEY: apiKey } = await mod.load({ envPath });

const messages: Message[] = [];

// Set system prompt at this timing
const systemPrompt: Message = {
  role: "system",
  content: "You should behave like kind chatbot",
};

// For stopping coversations when user type Ctrl+C

const sigIntHandler = () => {
  console.log("interrupted!");
  Deno.exit();
};
Deno.addSignalListener("SIGINT", sigIntHandler);

messages.push(systemPrompt);

while (true) {
  const input: string | null = prompt("🤖 Please enter input >>>");
  if (input === null) {
    console.log(
      "%c🤖 何か入力してください",
      "color: yellow; font-weight: bold"
    );
    Deno.exit(1);
  }

  if (input.toLowerCase() === "quit" || input.toLowerCase() === "exit") {
    console.log("%c🤖 終了します", "color: yellow; font-weight: bold");
    Deno.exit(1);
  }

  if (input.toLocaleLowerCase() == "clear") {
    console.log(
      "%c🤖 会話のログを削除します",
      "color: yellow; font-weight: bold"
    );
    messages.splice(1, messages.length - 1);
  }

  const userPrompt: Message = {
    role: "user",
    content: input!,
  };
  messages.push(userPrompt);

  const res = await completeChat(apiKey, messages);
  if (!res?.content) {
    console.log("failed to reponde");
    Deno.exit(1);
  }
  const assistant: Message = {
    role: "assistant",
    content: res.content,
  };
  messages.push(assistant);
  console.log(`🤖 : %c${res.content}`, "color: yellow; font-weight: bold");
}
