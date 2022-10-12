import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  name: any;
  tipoDoc: any;
  document: any;
  dateNac: any;
  email: any;
  telefono: any;
  userName: any;
  password: any;
  rePassword: any;
  data: any;
  addForm: any;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private loadingController: LoadingController,
    public service: LoginService
  ) { }

  save() {

    // Field Validaction
    if (this.name === undefined || this.name === '' || this.name == null) {
      const message = '"Nombre completo"';
      this.presentAlert(message);
      return false;
    }
    if (this.tipoDoc === undefined || this.tipoDoc === '' || this.tipoDoc == null) {
      const message = '"Tipo de documento"';
      this.presentAlert(message);
      return false;
    }
    if (this.document === undefined || this.document === '' || this.document == null) {
      const message = '"Numero de documento"';
      this.presentAlert(message);
      return false;
    }
    if (this.dateNac === undefined || this.dateNac === '' || this.dateNac == null) {
      const message = '"Fecha de nacimiento"';
      this.presentAlert(message);
      return false;
    }
    if (this.email === undefined || this.email === '' || this.email == null) {
      const message = '"Email"';
      this.presentAlert(message);
      return false;
    }
    if (this.telefono === undefined || this.telefono === '' || this.telefono == null) {
      const message = '"Teléfono"';
      this.presentAlert(message);
      return false;
    }
    if (this.password === undefined || this.password === '' || this.password == null) {
      const message = '"Contraseña"';
      this.presentAlert(message);
      return false;
    }
    if (this.rePassword === undefined || this.rePassword === '' || this.rePassword == null) {
      const message = '"Confirmar contraseña"';
      this.presentAlert(message);
      return false;
    }

    if (this.password !== this.rePassword) {
      const message = 'passWrong';

      this.presentAlert(message);
      return false;
    }

    this.addForm = {
      name: this.name,
      tipoDoc: this.tipoDoc,
      document: this.document,
      email: this.email,
      telefono: this.telefono,
      userName: this.userName,
      password: this.password
    };

    console.log('Data del fomulario: ', this.addForm);

    this.service.createUser(this.addForm).subscribe(data => {
      this.correctAlert('El registro fue exitoso, ahora puede ingresar con sus credenciales');
    }, error => {
      this.errorAlert('El registro no fue exitoso, intente nuevamente!');
    });
  }

  // Alerts
  // Load
  async presentLoadingBasic() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'circles',
      message: 'Por favor espere...',
      duration: 2000
    });
    await loading.present();
  }

  // Global alert error
  async presentAlert(message) {
    if (message === 'passWrong') {
      message = 'Las contraseñas no coinciden!';
    } else {
      message = 'El campo ' + message + ' es obligatorio!';
    }

    const alert = await this.alertController.create({
      header: 'Ocurrió un error!',
      message,
      buttons: ['Continuar']
    });

    await alert.present();
  }

  // Global alert good
  async correctAlert(message) {
    const alert = await this.alertController.create({
      header: 'Todo ha salido bien!',
      message,
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }],
    });

    await alert.present();
  }

  // Global alert good
  async errorAlert(message) {
    const alert = await this.alertController.create({
      header: 'Algo ha salido mal!',
      message,
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }],
    });

    await alert.present();
  }
}
