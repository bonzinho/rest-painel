import {Component, OnInit} from "@angular/core";
import { DishesService } from '../services/dishes.service';
import { AuthService } from '../../user/services/auth.service';

@Component({
    selector: 'app-dishes',
    templateUrl: './dishes.component.html'
})

export class DishesComponent implements OnInit {

    dishes: any = {};


    constructor(private httpService: DishesService, protected authService: AuthService) {}  // a diferença deste para o edit.component é o authService, pois é necessário autnticação

    ngOnInit() {
        this.authService.getUser()
            .then( (res) => {
            let id = res.restaurant.id;
            let options = {
                filters: [
                    { restaurant_id: id },
                ]
            };

            this.httpService.eventEmitter
                .subscribe(() => { // este subscribe é executado sempre que o emit é chamado, neste caso faz com que a listagem seja atualizada
                    this.httpService.builder().list(options)
                        .then((res) => this.dishes = res);
                });

            this.httpService.eventEmitter.emit(); // sempre que for chamado o emit é executado o subscribe em cima, que atualiza a lista

        });
    }

    remove(id: number) {
        this.httpService.builder().delete(id).then(() => {
           this.httpService.eventEmitter.emit();
        });
    }


}