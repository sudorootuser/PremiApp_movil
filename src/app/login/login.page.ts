import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, IonRouterOutlet, LoadingController, Platform } from '@ionic/angular';
import { LoginService } from '../services/login.service';

// Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
// Google
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  password: any;
  username: any;
  message: any;
  // Firebase
  picture;
  name;
  email;
  // End

  data = [];
  handlerMessage: string;

  constructor(
    // Firebase
    private authFire: AngularFireAuth,
    private googlePlus: GooglePlus,
    // End
    private router: Router,
    public apiService: LoginService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet,
  ) {
    // This code snippet is to close the application
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  // Valida que el usuario se encuentre logeado
  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/home']);
    }
  }

  // Ingreso por redes sociales
  // Condicional para validar si se encuentra en mobil o en Web
  loginGoogle() {
    if (this.platform.is('android')) {
      this.loginGoogleAndroid();
    } else {
      this.loginGoogleWeb();
    }
  }

  // Log In en android
  async loginGoogleAndroid() {
    const res = await this.googlePlus.login({
      webClientId: '843827523226-luas5dv61igt5kojikbm9f6h10e28inq.apps.googleusercontent.com',
      offline: true
    });

    const resConfirmed = await this.authFire.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
    if (resConfirmed) {

      // console.log('Movil', res);
      const user = resConfirmed.user;
      this.picture = user.photoURL;
      this.name = user.displayName;
      this.email = user.email;

      window.localStorage.setItem('user', this.name);
      this.router.navigate(['/my-gifts']);
    } else {
      console.log('Error, intente nuevamente');
    }
  }
  // Log In en Web
  async loginGoogleWeb() {
    const res = await this.authFire.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if (res) {
      const user = res.user;
      console.log('Web', res);
      this.picture = user.photoURL;
      this.name = user.displayName;
      this.email = user.email;

      window.localStorage.setItem('user', this.name);
      window.localStorage.setItem('img', this.picture);

      this.router.navigate(['/my-gifts']);

    } else {
      this.loginError();
    }

  }


  loginFacebook() {
    console.log('Login con Facebook');
  }

  // Ingresar al sistema con credenciales
  next() {

    const loginData = {
      username: this.username,
      password: this.password
    };

    this.apiService.login(loginData).subscribe(async (data: any) => {
      this.message = data.message;

      this.presentLoadingBasic();

      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user', data.user);
      this.router.navigate(['/my-gifts']);

    }, error => (
      this.loginError()
    ));

  }
  // Registrarce en el sistemas
  register() {
    this.router.navigate(['/registrar']);
  }

  // Answer Alerts
  async loginError() {
    const alert = await this.alertController.create({
      header: 'Ocurrió algo inesperado!',
      message: 'Las credenciales son incorrectas!!',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    });
    alert.present();
  }

  async presentLoadingBasic() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'circles',
      message: 'Por favor espere...',
      duration: 2000
    });
    await loading.present();

    await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      subHeader: 'Subtitle',
      message,
      buttons: ['Continuar']
    });

    await alert.present();
    alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
}
