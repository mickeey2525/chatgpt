export type Message = {
  role: "user" | "system" | "assistant";
  content: string;
};

export const completeChat = async (
  apiKey: string,
  messages: Message[]
): Promise<Message | undefined> => {
  const body = JSON.stringify({
    messages,
    model: "gpt-3.5-turbo",
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });
  const data = await res.json();

  const choice = 0;

  return data.choices[choice].message;
};
