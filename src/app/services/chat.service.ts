import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.local'; // 環境設定ファイルをインポート

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.openaiApiKey;

  constructor() {
    console.log('API URL:', this.apiUrl);
    console.log('API Key:', this.apiKey ? '存在します' : '存在しません'); // デバッグ用
  }

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
      if (axios.isAxiosError(error)) {
        console.error(
          'Error sending message to OpenAI:',
          error.response?.data || error.message
        );
      } else {
        console.error('An unexpected error occurred:', error);
      }
      throw error;
    }
  }
}
