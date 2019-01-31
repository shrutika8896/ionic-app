import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastMessageService } from '../toast-message.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  scannedText: String = '';
  constructor(private qrScanner: QRScanner,
    private toastMessageService: ToastMessageService) {
  }

  scanQRCode() {
    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted
       // start scanning
       const scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);
         this.scannedText = text;
         this.toastMessageService.presentToast(text);
         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
      this.toastMessageService.presentToast('Grant camera permissions from settings');
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
      this.toastMessageService.presentToast('Grant camera permissions from settings');
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => {
    console.log('Error is', e);
    this.toastMessageService.presentToast('Error in scanning QR code');
  });
}

}
