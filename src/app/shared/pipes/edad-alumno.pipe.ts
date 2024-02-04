import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edadAlumno'
})
export class EdadAlumnoPipe implements PipeTransform {
  transform(fecha_nacimiento: any): number {
    // Si la fecha es nula o indefinida devuelve null
    if (!fecha_nacimiento) {
      return null;
    }

    // Convierte la cadena de fecha de nacimiento a un objeto Date y verifica 
    // si la conversión fue exitosa usando isNaN, si la cadena no es una fecha válida, devuelve null
    const fechaNacimientoDate = new Date(fecha_nacimiento);
    if (isNaN(fechaNacimientoDate.getTime())) {
      return null;
    }

    const fechaActual = new Date();

    const anioActual = fechaActual.getFullYear();
    const anioNacimiento = fechaNacimientoDate.getFullYear();

    const diferenciaAnios = anioActual - anioNacimiento;

    const mesActual = fechaActual.getMonth() + 1;
    const mesNacimiento = fechaNacimientoDate.getMonth() + 1;

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNacimientoDate.getDate())) {
      return diferenciaAnios - 1;
    }

    return diferenciaAnios;
  }
}