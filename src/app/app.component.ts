import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularSignaturePadModule, NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { CommonModule } from '@angular/common';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

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

  signaturePadOptions: NgSignaturePadOptions = {
    canvasWidth: 210,
    canvasHeight: 110
  };

  image = new Image();
  image1 = new Image();

  // @ViewChild('divToPrint') content!: ElementRef;
  @ViewChild('divToPrint', { static: false }) divToPrint!: ElementRef;
  @ViewChild('sign', { static: false }) sign!: SignaturePadComponent;
  @ViewChild('sign1', { static: false }) sign1!: SignaturePadComponent;

  constructor() { }

  clear() {
    this.printbill = false;
    this.sign.clear();
  }

  done() {
    this.printbill = true;

    const signatureData = this.sign.toDataURL(); // Get the signature in Base64 format
    this.image.src = signatureData;
    const signatureData1 = this.sign1.toDataURL(); // Get the signature in Base64 format
    this.image1.src = signatureData1;


  }

  docs() {
    this.done();
    // const data: HTMLElement = document.getElementById('divToPrint') as HTMLElement;
    const data: HTMLElement = this.divToPrint.nativeElement;
    setTimeout(() => {
      html2canvas(data).then((canvas) => {

        const imgData = canvas.toDataURL('image/png');


        // Create a new jsPDF instance
        const pdf = new jsPDF({orientation: 'portrait'});

        // Add the canvas image as a new page to the PDF
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * (pdfWidth-52)) / (imgProps.width-100);
        console.log(imgProps.height, " : " , imgProps.width , " : ", pdfWidth, " : ", pdfHeight);

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Save the PDF
        pdf.save('t.pdf');
        // console.log(pdf.output('datauristring')); /
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    }, 200);
  }

}



