import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios'; // AxiosError 型をインポート
import { environment } from 'src/environments/environment'; // 環境設定ファイルをインポート

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.openaiApiKey;

  async sendMessage(prompt: string): Promise<any> {
    if (!this.apiKey) {
      console.error('APIキーが設定されていません。');
      throw new Error('APIキーが設定されていません。');
    }

    try {
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
      return response.data;
    } catch (error) {
      // エラーがAxiosError型かどうかを確認
      if (axios.isAxiosError(error)) {
        console.error(
          'Error sending message to OpenAI:',
          error.response?.data || error.message
        );
      } else {
        console.error('An unexpected error occurred:', error);
      }
      throw error; // 呼び出し元にエラーを再投げ
    }
  }
}
