import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.openaiApiKey;

  async sendMessage(prompt: string): Promise<any> {
    try {
      // APIリクエストを行う
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // 正常な応答を返す
      return response.data;
    } catch (error) {
      // エラーハンドリング
      console.error('Error sending message to OpenAI:', error);
      throw error; // 呼び出し元にエラーを再投げ
    }
  }
}
