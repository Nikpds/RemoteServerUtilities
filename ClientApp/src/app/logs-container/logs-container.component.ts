import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../http.service';

@Component({
  selector: 'app-logs-container',
  templateUrl: './logs-container.component.html',
  styleUrls: ['./logs-container.component.sass'],
})
export class LogsContainerComponent implements OnInit {
  constructor(private _http: HTTPService) {}

  ngOnInit(): void {}
}
