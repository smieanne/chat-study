import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  userInput: string = '';
  messages: Array<{ text: string; sender: 'user' | 'bot' }> = [];
  errorMessage: string = ''; // エラーメッセージを保持する

  constructor(private chatService: ChatService) {}

  async sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, sender: 'user' });
      this.errorMessage = ''; // エラーメッセージをリセット

      try {
        // サービスを呼び出してAPIリクエストを送信
        const response = await this.chatService.sendMessage(this.userInput);

        // 正しい位置にあるテキストを取得
        const botResponse = response.choices[0].message.content;
        console.log('Bot Response:', botResponse); // デバッグ用のログ

        // Botの応答メッセージを追加
        this.messages.push({ text: botResponse, sender: 'bot' });
      } catch (error) {
        this.errorMessage =
          'There was an error communicating with the server. Please try again later.';
        console.error('Error:', error);
      } finally {
        this.userInput = ''; // 入力フィールドをクリア
      }
    }
  }
}
