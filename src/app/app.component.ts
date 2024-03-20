import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularSignaturePadModule, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { CommonModule } from '@angular/common';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';

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
  image1 = new Image();

  @ViewChild('divToPrint', { static: false }) divToPrint!: ElementRef;
  @ViewChild('sign', { static: false }) sign!: SignaturePadComponent;
  @ViewChild('sign1', { static: false }) sign1!: SignaturePadComponent;

  constructor() { }

  @ViewChild('divToPrint') content!: ElementRef;


  generatePDF(): void {

    this.done();
    const DATA = this.content.nativeElement;
    const doc: jsPDF = new jsPDF({ unit: 'in', format: 'A4', orientation: 'portrait'});
    doc.html(DATA, {
       callback: (doc) => {
         doc.output("dataurlnewwindow",{"filename" : "sample"});
       }
    });
  }























  convertToPDF() {
    this.done();
    const element = this.content.nativeElement;
    const opt = {
      margin: [-0.6,0,0,0],
      filename: 'my_document.pdf',
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait', pyPDFEmbedFont:true }
    };

    // html2pdf().from(element).set(opt).output("dataurlnewwindow",{"filename" : "sample"});
    html2pdf().from(element).set(opt).outputPdf('datauristring');
  }


  printDiv() {


    this.done();
    // setTimeout(() => {
    //   let printContents = this.divToPrint.nativeElement.innerHTML;
    //   let originalContents = document.body.innerHTML;
    //   document.body.innerHTML = printContents;
    //   window.print();
    //   document.body.innerHTML = originalContents;
    // }, 1);
  }


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

  }
}
