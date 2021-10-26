import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap, tap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  creadores = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroePorId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) return;

    if (this.heroe.id) {
      // actualizar
      this.heroeService.actualizarHeroe(this.heroe).subscribe((resp) => {
        this.heroe = resp;
        this.mostrarSnackBar('Registro actualizado...');
      });
    } else {
      // guardar
      this.heroeService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('Registro creado...');
      });
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      data: { ...this.heroe },
    });

    //:TODO ver si se puede agregar un switchMap porque hay 2 subscribes

    dialog.afterClosed().subscribe((result) => {
      if (!result) return;
      this.heroeService.borrarrHeroe(this.heroe.id!).subscribe(() => {
        this.router.navigate(['/heroes']);
      });
    });
  }

  mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Ok', {
      duration: 2000,
    });
  }
}
