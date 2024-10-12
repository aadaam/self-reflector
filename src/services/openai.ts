import OpenAI from 'openai';

let openai: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
};

export const generateResponse = async (prompt: string): Promise<string> => {
  if (!openai) {
    throw new Error('OpenAI client not initialized. Please set your API key first.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    return response.choices[0].message.content || 'No response generated.';
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};