import { PromptTemplate } from "langchain/prompts";
import { template } from "@src/gpt/constants.gpt";
import { OpenAI } from "langchain";

class GPT {
  constructor(private readonly model: OpenAI, private readonly prompt: PromptTemplate) {}

  static async init() {
    const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 })
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["html"],
    })

    return new this(model, prompt);
  }

  async getResponse(html: string) {
    const formatted = await this.prompt.format({ html })
    return await this.model.call(formatted)
  }
}

export { GPT }
