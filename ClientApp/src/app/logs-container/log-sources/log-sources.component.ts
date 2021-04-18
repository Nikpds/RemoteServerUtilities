import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HTTPService } from 'src/app/http.service';

@Component({
  selector: 'app-log-sources',
  templateUrl: './log-sources.component.html',
  styleUrls: ['./log-sources.component.sass'],
})
export class LogSourcesComponent implements OnInit {
  @Output() sourceSelectedEvent = new EventEmitter(null);

  private subject: Subject<string> = new Subject();
  public openSelectBox = false;
  public searchText: string;
  public sources: any[];
  private _sources: any[];
  constructor(private _http: HTTPService) {}

  ngOnInit(): void {
    this._getSources();
    this.subject.pipe(debounceTime(400)).subscribe((searchTextValue) => {
      this._handleSearch(searchTextValue);
    });
  }

  searchSource(event: any) {
    this.subject.next(event.target.value);
  }

  onFocusOutEvent() {
    setTimeout(() => (this.openSelectBox = false), 100);
  }

  onFocusInEvent() {
    this.openSelectBox = true;
  }

  selectSource(value: string) {
    this.searchText = value;
    this.openSelectBox = false;
    this.sourceSelectedEvent.emit(value);
  }

  private _copy(data) {
    return JSON.parse(JSON.stringify(data));
  }

  private _handleSearch(searchTextValue: string) {
    if (searchTextValue) {
      this.searchText = searchTextValue;
      this.sources = this._sources.filter((x) =>
        x.name.toUpperCase().includes(searchTextValue.toUpperCase())
      );
      return;
    }
    this.searchText = null;
    this.sources = this._copy(this._sources);
  }

  private _getSources() {
    this._http.get(`EventLog/loggers`).subscribe((res) => {
      this._sources = this._copy(res);
      this.sources = res;
    });
  }
}
