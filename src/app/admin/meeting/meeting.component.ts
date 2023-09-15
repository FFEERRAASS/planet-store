import { Component, OnInit } from '@angular/core';
declare function start() :any;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  userId: any = localStorage.getItem('userId');
  receiverFk: any = localStorage.getItem('userId');

  ngOnInit() {

    start();
   }
}
