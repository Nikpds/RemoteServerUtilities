import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private openJobs = 0
  private selector = 'loaderContainer'
  private element: HTMLElement

  constructor() {
    this.element = document.getElementById(this.selector)
  }

  show(): void {
    this.openJobs += 1
    setTimeout(() => {
      if (this.openJobs > 0) {
        this.element.style.display = 'flex'
      }
    }, 0)
  }

  hide(delay = 0): void {
    this.openJobs -= 1
    if (this.openJobs < 1) {
      setTimeout(() => {
        this.element.style.display = 'none'
      }, delay)
    }
  }
}
