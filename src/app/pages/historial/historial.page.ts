import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router'; // Importa Router para redireccionar
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

import { TabService } from '../../services/tab.service';
import { PlatillosService } from 'src/app/services/platillos.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  platillosEntregados: any[] = [];
  filteredPlatillos: any[] = [];  // Platillos filtrados por fecha
  fechasDisponibles: string[] = [];  // Fechas con platillos entregados
  selectedDate: string = ''; // Fecha seleccionada
  isProfileMenuOpen: boolean = false; // Controlar si el menú está abierto o cerrado
  isLoggedIn: boolean = false;
  userName: string; // Variable para almacenar el nombre del usuario
  userId: number;
  private routerSubscription!: Subscription; // Suscripción a eventos de navegación

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
    this.cargarPlatillosEntregados();
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

  cargarPlatillosEntregados() {
    this.platillosService.obtenerEstado('Terminado').subscribe(
      (data) => {
        this.platillosEntregados = data;
        this.filteredPlatillos = data;  // Inicialmente mostramos todos los platillos entregados
        this.fechasDisponibles = this.getFechasDisponibles(data);
      },
      (error) => {
        console.error('Error al cargar platillos entregados:', error);
      }
    );
  }

  // Obtener las fechas únicas de los platillos entregados
  getFechasDisponibles(platillos: any[]): string[] {
    const fechas: string[] = [];
    platillos.forEach(platillo => {
      const fecha = new Date(platillo.hora_entregado);
      const fechaFormateada = fecha.toISOString().split('T')[0]; // Solo la fecha en formato YYYY-MM-DD
      if (!fechas.includes(fechaFormateada)) {
        fechas.push(fechaFormateada);
      }
    });
  
    // Ordenar las fechas de la más reciente a la más antigua
    return fechas.sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime(); // Ordenar de forma descendente
    });
  }

  // Filtrar los platillos por la fecha seleccionada
  filtrarPorFecha() {
    if (this.selectedDate) {
      this.filteredPlatillos = this.platillosEntregados.filter(platillo => {
        const fechaPlatillo = new Date(platillo.hora_entregado).toISOString().split('T')[0];
        return fechaPlatillo === this.selectedDate;
      });
    } else {
      this.filteredPlatillos = this.platillosEntregados; // Mostrar todos los platillos si no hay fecha seleccionada
    }
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
