import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Pusher from 'pusher-js';
import { DealerService } from 'src/app/services/dealer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chatForm!: FormGroup; 
  messages: any[] = [];
  senderFk = localStorage.getItem('userId');

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    public dealerService: DealerService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}
  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels :any;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData :any;

  ngOnInit(): void {
    this.dealerService.getAllProductForDealer();
    this.dealerService.vendorPurchase();
    this.dealerService.GetChatsBySenderReceiver();
    this.dealerService.numberOfReceiveMessage();

    this.dealerService.getAllContact();
    setTimeout(() => {
      this.barChartData = [
        { data: this.dealerService.profitChart, label: 'Total Net Profit' }
      ];
      this.barChartLabels = this.numberToWords(this.dealerService.profitChart.length);
    }, 1000);
    Pusher.logToConsole = true;

    var pusher = new Pusher('7a5d804f183e3725c865', {
      cluster: 'ap2'
    });
    var channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.dealerService.GetChatsBySenderReceiver();
      console.log(this.dealerService.messages);
    });

    this.chatForm = this.formBuilder.group({
      senderFk: this.senderFk,
      message: ['', [Validators.required]], // Make the message field required
    });
  }
  numberToWords(num: number): string[] {
    const numberWords = [
      'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN',
      'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN', 'TWENTY'
    ];

    if (num < 1 || num > 20) {
      return numberWords.slice(0, 20);

    }

    return numberWords.slice(0, num);
  }

  setReceiver(receiverId: any) {
    debugger;
    localStorage.setItem('receiverId', receiverId);
    var receiver = localStorage.getItem('receiverId');
    if (receiver != null) {
      this.dealerService.GetChatsBySenderReceiver();
    }
  }

  submit(): void {
    debugger;
    var receiverFk1 = localStorage.getItem('receiverId');

    // Check if the message field is valid
    if (this.chatForm.get('message')?.valid) {
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
              // Handle success
            }
            console.log('Message sent successfully', response);
            this.chatForm.get('message')?.setValue('');
          },
          (error) => {
            console.error('Error sending message', error);
          }
        );
    } else {
      // If the message field is not valid, you can display an error or take other actions.
      console.log('Message field is required.');
    }
  }
}