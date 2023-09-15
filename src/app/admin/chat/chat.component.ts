import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup

import Pusher from 'pusher-js';
import { DealerService } from 'src/app/services/dealer.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  chatForm!: FormGroup; // Create a FormGroup
  messages: any[] = [];
  senderFk = localStorage.getItem('userId');

  constructor(private http: HttpClient, public dealerService: DealerService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.dealerService.GetChatsBySenderReceiver();

    this.dealerService.getAllContact();
    Pusher.logToConsole = true;

    var pusher = new Pusher('7a5d804f183e3725c865', {
      cluster: 'ap2'
    });
    var channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.dealerService.GetChatsBySenderReceiver();
      console.log(this.dealerService.messages)
    });

    this.chatForm = this.formBuilder.group({
      senderFk: this.senderFk,
      message: ['', [Validators.required]],
    });
  }

  setReceiver(receiverId: any) {
    debugger
    localStorage.setItem('receiverId', receiverId);
    var receiver = localStorage.getItem('receiverId');
    if (receiver != null) {
      this.dealerService.GetChatsBySenderReceiver();
    }

  }
  submit(): void {
    debugger
    var receiverFk1 = localStorage.getItem('receiverId');
    if (this.chatForm.get('message')?.valid) {

    if (this.chatForm?.get('message')) {
      this.http
        .post('https://localhost:7100/api/Chat/message', {
          chatMessage: this.chatForm.get('message')?.value,
          senderFk: this.chatForm.get('senderFk')?.value,
          receiverFk: receiverFk1,
        })
        .subscribe(
          (response) => {
            var receiver = localStorage.getItem('receiverId');
            if (receiver != null) {

            }
            console.log('Message sent successfully', response);
            this.chatForm.get('message')?.setValue('');
          },
          (error) => {
            console.error('Error sending message', error);
          }
        );
    }
  }
}

}
