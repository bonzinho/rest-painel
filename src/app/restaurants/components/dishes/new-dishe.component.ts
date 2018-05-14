import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as jQuery from 'jquery'; // importar o jquery
import { AuthService } from '../../../user/services/auth.service';
import { DishesService } from '../../services/dishes.service';

@Component({
    selector: 'app-new-dishe',
    templateUrl: './new-dishe.component.html'
})

export class NewDisheComponent implements OnInit {

    dish: any = {};

    constructor(private router: Router, protected authService: AuthService, protected httpService: DishesService) {}

    ngOnInit() {

        jQuery('.modal').modal({complete: () => this.router.navigate(['/dishes'])}); // inicializar o modal e definir que quando fechar o modal volta para o dashboard
        jQuery('.modal').modal('open'); // abrir o modal

        this.authService.getUser()
            .then( (res) => {
                this.dish.restaurant_id = res.restaurant.id; // logo que é iniciado guarda o id do restaurante com base no utilizador
            });

    }

    addFile(e) {
        this.dish.photo = e.target.files[0]; // Pega o arquivo e guarda na variavel dish para posteriormente enviar
    }

    save(e) {
        e.preventDefault();

        if (!this.dish.photo) { // Verifica se tem foto
            window.Materialize.toast('Selecione uma fotografia', 3000, 'red');
            return;
        }

        let formData = new FormData();
        formData.append('photo', this.dish.photo);
        formData.append('name', this.dish.name);
        formData.append('description', this.dish.description);
        formData.append('price', this.dish.price);
        formData.append('restaurant_id', this.dish.restaurant_id);

        this.httpService.builder('')
            .insert(formData)
            .then(() => {
                // para atualizar automaticamente logo após o envio dos dados
                this.httpService.eventEmitter.emit();
                jQuery('.modal').modal('close'); // quando o modal é fechado, é detetado que o evento foi completado e faz o reencaminhamento da rota (ver ngInit jQuery('.modal').modal({complete: () => this.router.navigate(['/dishes'])});)
            });
    }
}