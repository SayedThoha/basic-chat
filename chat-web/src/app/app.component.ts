import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'chat-web';

  isJoined: boolean = false;
  messages: any[] = [];
  name: string = '';
  message: string = '';
  constructor(private socket: Socket) {}

  ngOnInit(): void {
    this.socket.on('chat-received', (data) => {
      console.log('chat-received', data);
      this.messages.push(data);
    });
  }
  join() {
    console.log('join', this.name);
    this.socket.emit('join', this.name);
    this.isJoined = true;
  }

  send() {
    console.log('send', this.message);
    this.socket.emit('chat', { name: this.name, chat: this.message });
    this.message = '';
  }
}
