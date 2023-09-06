import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealerService } from 'src/app/services/dealer.service';
@Component({
  selector: 'app-saleschart',
  templateUrl: './saleschart.component.html',
  styleUrls: ['./saleschart.component.css']
})
export class SaleschartComponent implements OnInit {
  constructor(private datePipe: DatePipe,private spinner: NgxSpinnerService,public dealerService: DealerService, public dialog: MatDialog) { }
  public chart: any;

  ngOnInit() {
  }



}