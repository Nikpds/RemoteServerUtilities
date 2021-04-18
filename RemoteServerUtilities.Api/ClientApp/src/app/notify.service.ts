import { Injectable } from '@angular/core';

import { SnotifyService } from 'ng-snotify';
@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private srv: SnotifyService) {
    this.srv.config.toast.titleMaxLength = 20;
    this.srv.config.toast.timeout = 4000;
  }

  success(
    message: string = 'To αίτημα σας πραγματοποιήθηκε με επιτυχία!',
    title: string = 'Επιτυχία'
  ) {
    this.srv.success(message, title);
  }

  warning(message, title: string = 'Προσοχή') {
    this.srv.warning(message, title);
  }

  danger(
    message: string = 'To αίτημα απέτυχε.',
    delay = 4,
    title: string = 'Σφάλμα'
  ) {
    this.srv.error(message, title);
  }

  info(message, title: string = 'Ενημέρωση') {
    this.srv.info(message, title);
  }

  simple(message, title: string = '???') {
    this.srv.simple(message, title);
  }
}
