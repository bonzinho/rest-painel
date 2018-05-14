import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as jQuery from 'jquery'; //importar o jquery
import { DishesService } from '../../services/dishes.service';

@Component({
    selector: 'app-edit-dishe',
    templateUrl: './edit-dishe.component.html'
})

export class EditDisheComponent implements OnInit {

    dish: any = {};


    constructor(private router: Router, private route: ActivatedRoute, protected httpService: DishesService) {}

    ngOnInit() {

        jQuery('.modal').modal({complete: () => this.router.navigate(['/dishes'])}); // inicializar o modal e definir que quando fechar o modal volta para o dashboard
        jQuery('.modal').modal('open'); // abrir o modal

        this.route.params.subscribe(params => {
            this.httpService.builder()
                .view(params['id'])
                .then(res => {
                    this.dish = res;
                    window.Materialize.updateTextFields();
                });
        });

    }

    addFile(e) {
        this.dish.photo = e.target.files[0]; // Pega o arquivo e guarda na variavel dish para posteriormente enviar
    }

    save(e) {
        e.preventDefault();

        let formData = this.dish;

        // Verifica se quer editar foto
        if (this.dish.photo) {
            formData = new FormData();
            formData.append('photo', this.dish.photo);
            formData.append('name', this.dish.name);
            formData.append('description', this.dish.description);
            formData.append('price', this.dish.price);
            formData.append('restaurant_id', this.dish.restaurant_id);
        }



        this.httpService.builder('')
            .update(this.dish.id, formData)
            .then(() => {
                // para atualizar automaticamente logo após o envio dos dados
                this.httpService.eventEmitter.emit();
                jQuery('.modal').modal('close'); // quando o modal é fechado, é detetado que o evento foi completado e faz o reencaminhamento da rota (ver ngInit jQuery('.modal').modal({complete: () => this.router.navigate(['/dishes'])});)
            });
    }
}