import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  segment ='generate';
  qrText = ''

  constructor(
    private loadingController: LoadingController
  ) {}

//========= capturar html convertilo a canvas y generar la imagen =========
  captureScreen(){

    const element = document.getElementById('qrImage') as HTMLElement;

    html2canvas(element).then((canvas: HTMLCanvasElement) => {

      this.downloadImage(canvas);

    })

  }

//========= Descargar Imagen Web =========
  downloadImage(canvas: HTMLCanvasElement){

    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();

  }
   //========= Buscar Imagen mobile =========
  async shareImage(canvas: HTMLCanvasElement){
    
    let base64 = canvas.toDataURL();
    let path = 'qr.png';

    
      const loading = await this.loadingController.create({
        message: 'Hellooo',
        duration: 2000,
        spinner: 'bubbles'
      });
      
      await loading.present();
    
    
      await Filesystem.writeFile({
        path,
        data: base64,
        directory: Directory.Cache,
      }).then(async (res) => {


        let uri = res.uri;

        await Share.share({url: uri});

await Filesystem.deleteFile({
  path,
  directory: Directory.Cache
})

      })
    
    
    
    

  }

}
