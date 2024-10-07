import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const elements = this.elementRef.nativeElement.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
      const toRotate = elements[i].getAttribute('data-type');
      const period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }

    // Inject CSS
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff }';
    document.body.appendChild(css);
  }
}

class TxtType {
  private loopNum: number;
  private txt: string;
  private isDeleting: boolean;
  
  constructor(private el: HTMLElement, private toRotate: string[], private period: string) {
    this.loopNum = 0;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
  }

  tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);

    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = parseInt(this.period, 10) || 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }
}
