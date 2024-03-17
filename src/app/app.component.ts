import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularSignaturePadModule, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularSignaturePadModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'signature';

  printbill:boolean = false;
  value:any

  image = new Image();
  @ViewChild('divToPrint', { static: false }) divToPrint!: ElementRef;
  @ViewChild('sign', { static: false }) sign!: SignaturePadComponent;
  @ViewChild('sign', { static: false }) sign1!: ElementRef;

  constructor() { }




  printDiv() {

    this.done();
    setTimeout(() => {
      let printContents = this.divToPrint.nativeElement.innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }, 1);
  }

  clear() {
    this.sign.clear();
  }

  done() {
    this.printbill = true;

    const signatureData = this.sign.toDataURL(); // Get the signature in Base64 format
    this.image.src = signatureData;


  }
}
