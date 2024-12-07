import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router'; // Importa Router para redireccionar
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

import { TabService } from '../../services/tab.service';
import { PlatillosService } from 'src/app/services/platillos.service';
//Ejemplo de comentario para Github en la rama Main

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  isProfileMenuOpen: boolean = false; // Controlar si el menú está abierto o cerrado
  isLoggedIn: boolean = false;
  userName: string; // Variable para almacenar el nombre del usuario
  userId: number;
  private routerSubscription!: Subscription; // Suscripción a eventos de navegación
  platillosEnProceso: any[] = [];

  constructor(
    private authService: AuthService, // Servicio de autenticación
    private router: Router, // Router para redireccionar
    public tabService: TabService,
    private navCtrl: NavController,
    private platillosService: PlatillosService
  ) {
    // Inicializar el nombre del usuario y el estado de autenticación
    this.userName = this.authService.getUserName(); // Método para obtener el nombre del usuario
    this.isLoggedIn = !!this.userName; // Comprobar si el usuario está autenticado
    this.userId = this.authService.getUserId(); //Obtener el ID del usuario para peticiones en los servicios
  }

  ngOnInit() {
    this.loadUserData(); //Cargar datos del usuario
    this.subscribeToRouterEvents();
    this.cargarPlatillosEnProceso();
  }

  // Carga datos del usuario
  private loadUserData() {
    this.userName = this.authService.getUserName();
    this.userId = this.authService.getUserId();
    this.isLoggedIn = !!this.userName;
  }

  // Suscripción a eventos de navegación
  private subscribeToRouterEvents() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeProfileMenu();
        this.loadUserData();
      }
    });
  }

  ngOnDestroy() {
    // Cancelar la suscripción para evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  cargarPlatillosEnProceso() {
    this.platillosEnProceso = this.platillosService.getPlatillosByEstado('En Proceso');
  }

  recibirPlatillo() {
    // Obtener el primer platillo en estado "En Espera"
    const platilloEnEspera = this.platillosService.getPlatillosByEstado('En Espera')[0];
  
    if (platilloEnEspera) {
      // Cambiar el estado del platillo a "En Proceso"
      this.platillosService.updateEstadoPlatillo(platilloEnEspera.id, 'En Proceso');
      this.cargarPlatillosEnProceso(); // Recargar los platillos en proceso
    } else {
      // Mensaje si no hay platillos en espera
      console.log('No hay más platillos en espera');
    }
  }
  

  marcarComoTerminado(id: number) {
    this.platillosService.updateEstadoPlatillo(id, 'Terminado');
    this.cargarPlatillosEnProceso();
  }

  borrarPlatillo(id: number) {
    this.platillosService.updateEstadoPlatillo(id, 'Eliminado');
    this.cargarPlatillosEnProceso();
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout(); // Lógica para cerrar sesión
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }

  // Método para iniciar sesión
  login() {
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }

  // Cerrar el menú de perfil
  closeProfileMenu() {
    this.isProfileMenuOpen = false;
  }

  goToHomePage() {
    this.tabService.selectedTab = 'home';
    this.router.navigate(['/home']);
  }

  goToHistPage() {
    this.tabService.selectedTab = 'hist';
    this.router.navigate(['/historial']);
  }

  goToCamPage() {
    this.tabService.selectedTab = 'cam';
    this.router.navigate(['/camara']);
  }
  // Alternar el estado de apertura/cierre del menú de perfil
  toggleProfileMenu() {
    this.tabService.selectedTab = 'profile';
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
}