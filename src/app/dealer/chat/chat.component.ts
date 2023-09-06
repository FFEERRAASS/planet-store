import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: string[] = [];

  constructor() {
    const pusher = new Pusher('0d3b1c4907668805d37a', {
      cluster: 'ap2', // Use your Pusher cluster
    });

    const channel = pusher.subscribe('my-channel'); // Use your channel name

    channel.bind('my-event', (data: any) => {
      this.messages.push(data.message);
    });
  }

  ngOnInit() {}
}
