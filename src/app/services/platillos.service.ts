import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatillosService {
  private platillos = [
    { id: 1, nombre: 'Enchiladas Verdes', estado: 'En Proceso', horaEntregado: null },
    { id: 2, nombre: 'Tacos al Pastor', estado: 'En Espera', horaEntregado: null },
    { id: 3, nombre: 'Pozole', estado: 'En Espera', horaEntregado: null },
    { id: 4, nombre: 'Chiles Rellenos', estado: 'En Espera', horaEntregado: null },
    { id: 5, nombre: 'Sopes', estado: 'Terminado', horaEntregado: new Date('2024-12-01T10:00:00') },
    { id: 6, nombre: 'Tortas Ahogadas', estado: 'En Espera', horaEntregado: null },
    { id: 7, nombre: 'Tamales de Elote', estado: 'Eliminado', horaEntregado: null },
    { id: 8, nombre: 'Cochinita Pibil', estado: 'En Espera', horaEntregado: null },
    { id: 9, nombre: 'Mole Poblano', estado: 'En Espera', horaEntregado: null },
    { id: 10, nombre: 'Quesadillas', estado: 'En Proceso', horaEntregado: null },
    { id: 11, nombre: 'Birria', estado: 'Terminado', horaEntregado: new Date('2024-12-01T12:30:00') },
    { id: 12, nombre: 'Flautas de Pollo', estado: 'En Proceso', horaEntregado: null },
    { id: 13, nombre: 'Arroz con Leche', estado: 'En Espera', horaEntregado: null },
    { id: 14, nombre: 'Chilaquiles', estado: 'Terminado', horaEntregado: new Date('2024-12-02T09:00:00') },
    { id: 15, nombre: 'Caldo de Res', estado: 'Eliminado', horaEntregado: null },
    { id: 16, nombre: 'Pescado a la Veracruzana', estado: 'En Espera', horaEntregado: null },
    { id: 17, nombre: 'Carne Asada', estado: 'En Espera', horaEntregado: null },
    { id: 18, nombre: 'Albóndigas', estado: 'En Proceso', horaEntregado: null },
    { id: 19, nombre: 'Ceviche', estado: 'Eliminado', horaEntregado: null },
    { id: 20, nombre: 'Tostadas de Tinga', estado: 'En Espera', horaEntregado: null },
    { id: 21, nombre: 'Aguachile', estado: 'Terminado', horaEntregado: new Date('2024-12-03T11:15:00') },
    { id: 22, nombre: 'Huevos Rancheros', estado: 'En Proceso', horaEntregado: null },
    { id: 23, nombre: 'Pambazos', estado: 'En Espera', horaEntregado: null },
    { id: 24, nombre: 'Gorditas', estado: 'Terminado', horaEntregado: new Date('2024-12-03T13:45:00') },
    { id: 25, nombre: 'Tlacoyos', estado: 'En Proceso', horaEntregado: null },
    { id: 26, nombre: 'Tamales Oaxaqueños', estado: 'Eliminado', horaEntregado: null },
    { id: 27, nombre: 'Barbacoa', estado: 'En Espera', horaEntregado: null },
    { id: 28, nombre: 'Caldo Tlalpeño', estado: 'En Espera', horaEntregado: null },
    { id: 29, nombre: 'Entomatadas', estado: 'En Proceso', horaEntregado: null },
    { id: 30, nombre: 'Pollo en Adobo', estado: 'Terminado', horaEntregado: new Date('2024-12-03T14:30:00') },
  ];

  getPlatillosByEstado(estado: string) {
    return this.platillos.filter((platillo) => platillo.estado === estado);
  }

  updateEstadoPlatillo(id: number, nuevoEstado: string) {
    const platillo = this.platillos.find((p) => p.id === id);
    if (platillo) {
      platillo.estado = nuevoEstado;
      if (nuevoEstado === 'Terminado') {
        platillo.horaEntregado = new Date(); // Registrar la hora actual
      }
    }
  }

  getPlatillosTerminados() {
    return this.platillos.filter((platillo) => platillo.estado === 'Terminado');
  }
}
