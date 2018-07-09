import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../user/services/auth.service';
import { RestaurantService } from '../services/restaurant.service';
import * as jQuery from 'jquery';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {

    dragging: boolean = false;
    restaurant: any = {};
    photos: any[] = [];
    address: any = {};
    upload_status: string = 'not';
    restaurantPhoto: any = null;

    constructor(protected authService: AuthService, protected httpService: RestaurantService) {}

    ngOnInit() {
        this.authService.getUser().then( (res) => {
            console.log(res);
            let id = res.restaurant.id;
            this.httpService.builder().view(id)
                .then( (res) => {
                    this.restaurant = res;
                    this.address = res.address || {};
                    // window.Materialize.updateTextFields(); // para que o placeholder do materialize active e passe para cima

                    return this.httpService.builder('/' + this.restaurant.id + '/photos')
                        .list(); // Requisição para aceder às fotografias do restaurante

                }).then((res) => {
                    this.photos = res;
                    this.materialBoxStart();

            });
        });
    }


    upload(e) {
        e.preventDefault();

        let image_url: any;

        if (e.dataTransfer) {
            image_url = e.dataTransfer.files[0];
        } else {
            image_url = e.target.files[0];
        }

        this.upload_status = 'sending';  // faz mudar a mensagem do quadrado da imagem de upload

        const formData = new FormData();
        formData.append('photo', image_url);
        this.httpService.builder()
            .upload(this.restaurant.id + '/upload', formData)
            .then(() => {
                this.upload_status = 'success'; // faz mudar a mensagem do quadrado da imagem de upload
            })
            .catch(() => {
                this.upload_status = 'error';  // faz mudar a mensagem do quadrado da imagem de upload
            });
    }

    dragover(e) {
        e.stopPropagation();
        e.preventDefault();
        this.dragging = true; // está a ser feito um drag passa a variavel para true
    }

    /*seacrhCodPostal() {
        let codPostal = this.address.codPostal || null;
        if (codPostal && codPostal.length === 8){
            this.httpService.getCodPostal(codPostal)
                .then((res) => {
                    this.address = {
                        codPostal: codPostal,
                        city: res.result
                    }
                });
        }
    }*/

    save(e) {
        e.preventDefault();
        this.httpService.builder()
            .update(this.restaurant.id, this.restaurant)
            .then( () => {
                return this.httpService.builder('/' + this.restaurant.id + '/address')
                    .insert(this.address);
            })
            .then( () => {
                window.Materialize.toast('Restaurante Editado com sucesso');
            });
    }

    preparePhoto(e) {
        // console.log(e.target.files); // é um campo de formulário, assim sendo acedemos atraves de e.target.files[];
        let image_url = e.target.files[0];
        const formData = new FormData();
        formData.append('restaurant_id', this.restaurant.id);
        formData.append('url', image_url);
        this.restaurantPhoto = formData;
    }

    sendPhoto() {
        if (this.restaurantPhoto === null) {
            window.Materialize.toast('Selecione uma foto!');
            return;
        }
        this.httpService.builder()
            .upload('photos', this.restaurantPhoto)
            .then(() => {
                return this.httpService.builder('/' + this.restaurant.id + '/photos')
                    .list(); // Atualiza a lista de fotografias
            })
            .then((res) => {
                this.photos = res;
                this.materialBoxStart();

            });
    }

    deletePhoto(photo){
        this.httpService.builder('/photos')
            .delete(photo.id)
            .then(() => {
                return this.httpService.builder('/' + this.restaurant.id + '/photos')
                    .list(); // Atualiza a lista de fotografias
            })
            .then((res) => {
                this.photos = res;
                this.materialBoxStart();
            });
    }


    private materialBoxStart() {
        setTimeout( () => jQuery('.materialboxed').materialbox(), 1000);
    }




}