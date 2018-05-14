//Centraliza todas as requisições
import {Injectable} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import { AppHttpService } from '../../app-http.service';

import 'rxjs/add/operator/toPromise'; // importar promisses

@Injectable()
export class RestaurantService extends AppHttpService {

    protected  url: string;
    protected header: Headers;

    // Construtor de rotas para as requisições
    builder(resource: string = '') {
        return super.builder('restaurants' + resource); // Super deixa aceder a metodos da class pai (Extends AppHttpService)
    }

    getCodPostal(codPostal: string) {
        let url = 'http://www.ctt.pt/pdcp/xml_pdcp' + '?incodpos=' + codPostal;
        //let url = 'http://maps.googleapis.com/maps/api/geocode/json?&address=' + codPostal;
        return this.request().get(url)
            .toPromise()
            .then((res) => {
                 return res.json() || {};
            });
    }

    upload(url: string, data: Object) {
        const observable = this.http.post(this.url + '/' + url, data, {headers: this.header});
        return this.toPromise(observable);
    }
}