import { Component, OnInit, Output } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {
  heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
    });
    // this.heroesService.getHeroes().subscribe(console.log) --> esto sería lo mismo de arriba
  }
}
