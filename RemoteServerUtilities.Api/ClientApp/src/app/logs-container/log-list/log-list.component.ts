import { Component, OnInit } from '@angular/core';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.sass'],
})
export class LogListComponent implements OnInit {
  logEntries: any[];
  source = '';
  constructor(private _http: HTTPService) {}

  ngOnInit(): void {}

  getSources(source: string) {
    this.source = source;
    this._http.post(`EventLog/logs`, { source }).subscribe(
      (res) => {
        this.logEntries = res;
      },
      (err) => (this.logEntries = [])
    );
  }

  clearLogs() {
    this._http
      .post(`EventLog/clear`, { source: this.source })
      .subscribe((res) => {
        if (res) this.logEntries = [];
      });
  }

  refreshLogs() {
    this.getSources(this.source);
  }

  download() {
   alert('Not implemented yet. And may never happend.')
  }

  copyMessage(value: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  levelColor(level: string) {
    switch (level) {
      case 'Error':
        return 'is-danger';
      case 'Warning':
        return 'is-warning';
      case 'Information':
        return 'is-info';
      case 'SuccessAudit':
        return 'is-success';
      case 'FailureAudit':
        return 'is-dark';
      default:
        return '';
    }
  }
}
