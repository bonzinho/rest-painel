import {Component, OnInit} from '@angular/core';
import { AppHttpService } from '../app-http.service';
import { RestaurantService } from './restaurant.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {

    dragging: boolean = false;
    restaurant: any = {};
    address: any = {};

    constructor(protected appHttpServices: AppHttpService, protected httpService: RestaurantService) {}

    ngOnInit() {
        this.appHttpServices.getUser().then( (res) => {
            let id = res.restaurant.id;
            this.httpService.builder().view(id)
                .then( (res) => {
                    this.restaurant = res;
                    this.address = res.address || {};
                    // window.Materialize.updateTextFields(); // para que o placeholder do materialize active e passe para cima
                });
        });
    }


    upload(e) {
        e.preventDefault();
        console.log(e.dataTransfer.files);
    }

    dragover(e) {
        e.stopPropagation();
        e.preventDefault();
        this.dragging = true; // está a ser feito um drag passa a variavel para true
    }

    save(e) {
        e.preventDefault();
        this.httpService.builder()
            .update(this.restaurant.id, this.restaurant)
            .then( () => {
                return this.httpService.builder('/' + this.restaurant.id + '/address')
                    .insert(this.address);
            })
            .then( () => {
                // após a tarefa de atualizar o restaurante e o endereço pode ser feito alguma cois por isso then()
            });
    }




}