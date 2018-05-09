//Centraliza todas as requisições
import {Injectable} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import { AppHttpService } from '../app-http.service';

import 'rxjs/add/operator/toPromise'; // importar promisses

@Injectable()
export class RestaurantService extends AppHttpService{

    protected  url: string;
    protected header: Headers;

    // Construtor de rotas para as requisições
    builder(resource: string = '') {
        return super.builder('restaurants' + resource); // Super deixa aceder a metodos da class pai (Extends AppHttpService)
    }

}