import { Component, ViewChild, ElementRef  } from '@angular/core';
import jsQR, { QRCode } from 'jsqr';

 
@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.css']
 
})
export class QrReaderComponent {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

  readQrCode(event: any) {
    const file = event.target.files[1];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
    
      img.onload = () => {
        const canvas = this.canvasRef.nativeElement;
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        if (context) {
          context.drawImage(img, 0, 0, img.width, img.height);
        }
        if (context) {
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code: QRCode | null = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          console.log('Código QR decodificado:', code.data);
        } else {
          console.log('No se pudo decodificar ningún código QR.');
        }
      };
    };

    reader.readAsDataURL(file);
  }
}

}
