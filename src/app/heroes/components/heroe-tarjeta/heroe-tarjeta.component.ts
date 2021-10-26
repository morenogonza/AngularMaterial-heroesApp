import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class HeroeTarjetaComponent {
  @Input() heroe!: Heroe; // --> asi le decimos a TS que siempre vamos a tener un valor en esta propiedad
  // @Input() heroe: Heroe | undefined; --> esta es otra manera de definir el input sin ningun valor
}
