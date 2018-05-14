//Centraliza todas as requisições
import {Injectable, EventEmitter} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import { AppHttpService } from '../../app-http.service';

import 'rxjs/add/operator/toPromise'; // importar promisses

@Injectable()
export class DishesService extends AppHttpService {

    eventEmitter: EventEmitter<any> = new EventEmitter();  // para receber os callbacks

    protected  url: string;
    protected header: Headers;

    // Construtor de rotas para as requisições
    builder(resource: string = '') {
        return super.builder('dishes' + resource); // Super deixa aceder a metodos da class pai (Extends AppHttpService)
    }


    update(id: number, data: object) {
        const _options = new RequestOptions({headers: this.header});
        const url = this.url;
        let observable = this.http.post(url + '/' + id, data, _options);
        return this.toPromise(observable);
    }

    upload(url: string, data: Object) {

        const observable = this.http.post(this.url + '/' + url, data, {headers: this.header});
        return this.toPromise(observable);
    }



}