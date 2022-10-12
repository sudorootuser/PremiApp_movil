import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public localStorage: string;
  public imgsTorage: string;

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public appPages = [
    { title: 'Mis premios', url: '/pages/my-gifts', icon: 'gift-outline' },
    { title: 'Compartir', url: '/pages/share ', icon: 'share-social-outline' },
    { title: 'Terminos y condiciones', url: '/pages/terms', icon: 'newspaper-outline' },
    { title: 'Perfil', url: '/pages/profile', icon: 'person-outline' },
    { title: 'Quines somos', url: '/pages/about', icon: 'people-outline' },
    { title: 'Productos', url: '/pages/product', icon: 'cube-outline' }
  ];

  constructor(private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.localStorage = localStorage.getItem('user');
    this.imgsTorage = localStorage.getItem('img');

    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['/login']);
    }

  }

  async logOut() {

    const alert = await this.alertCtrl.create({
      header: 'Salir del sistema',
      message: '¿Quieres cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('img');

            this.router.navigate(['/login']);
          }
        }
      ]
    });
    (alert).present();
  }
}
