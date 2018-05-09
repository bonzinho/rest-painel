//Centraliza todas as requisições
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {environment} from '../environments/environment';

import 'rxjs/add/operator/toPromise'; //importar promisses

@Injectable()
export class AppHttpService {

    /* protecteed so tem acesso esta classe e outras classes que tenham herança come sta classe */

    protected  url: string;
    protected header: Headers;


    constructor(protected http: Http) {
        this.setAccessToken();
    }

    getUser() {
        return this.builder('auth/me').list();
    }

    setAccessToken() {
        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE0ZGU0NTM4NzJmM2I1MGQ3NDYxN2E5MjFiZjUzZTA0YWNkNGZmNDY0YzVhYzliYjA1YTY4NzJkM2RmM2NiMmQyMmFjNDA5OGRkNTRkM2Y4In0.eyJhdWQiOiI1IiwianRpIjoiYTRkZTQ1Mzg3MmYzYjUwZDc0NjE3YTkyMWJmNTNlMDRhY2Q0ZmY0NjRjNWFjOWJiMDVhNjg3MmQzZGYzY2IyZDIyYWM0MDk4ZGQ1NGQzZjgiLCJpYXQiOjE1MjU4NTg2MDUsIm5iZiI6MTUyNTg1ODYwNSwiZXhwIjoxNTU3Mzk0NjA1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.hoNXqWY0361SokK0FGf6Kf4lP0McYpL6nwXrbh64kE0txehxPQpX5S6VJsQ9FaD-BW_rJSNfd2MqgnG9fnYp5Xx-MV9LfWBHXW6dsc6m3TZRjpWHfWK6Pq3tcYjG-1PPNYerOI2d4mQnNF9zjiwFjbYrNhq0dly9tyJeB6QvGFg8Pe26PeAs69U0K38YfUi8tOcxvPn_D4zUup7KtRHgmJBSj1MO39Y87m4dNPcb9PzXaeYaC5r9bXp0ThrFihfnel5G2AW1lO1BJum6AVHDsUlLTtpP95I465xz8yxWDRvR1LNmITFENX9gcIZhOP3K7NPOOsjlkL0xvEa9loI5cJY_q_49m99mfbIWy8ZyhN_kLrdfp2qSSv0lWlsH4EAvz7iQMt99egy6-Tf4_cUuGgqpbP_HjJ-Xlq19lJ8qyhdXEs5smDvMNPWmapLUYvpam3IQsIhymsX1ln1r8ye4bNyxo-jSjB2Lf_JdfoSoYcwJWtzAFRTMpdk1p0RPuRuGZnHETcbB1zQDJrqWGN-vdsZS8B1KfM1K6D7tcC9ywpFA5qNVqfypggChA77h88mYdnWL30EQc_EIQSMkUvOBapGUTyZd8kGrOnMUCZ7iPX8I2BdxIns9J9sYJgr29zBhdP9yhb5qo1iI95LMrgeDmL2RVuiFjikNsnhI8EfMgvE";
        //this.header = new Headers({'Authorization': 'Bearer ' + token, 'Accept': 'application/json'});
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        this.header = headers;
    }

    // Construtor de rotas para as requisições
    builder(resource: string) {
        this.url =  'http://localhost:8000/api/v1/' + resource;
        return this;
    }

    list(options: any = {}) {
        const _options = new RequestOptions({headers: this.header});
        const url = this.url;
        return this.http.get(url, _options)
            .toPromise()
            .then((res) => {
                return res.json() || {};
            });
    }

    view(id: number) {
        const _options = new RequestOptions({headers: this.header});
        const url = this.url;
        return this.http.get(url + '/' + id, _options)
            .toPromise()
            .then((res) => {
                return res.json() || {};
            });
    }

    update(id: number, data: object) {
        const _options = new RequestOptions({headers: this.header});
        const url = this.url;
        return this.http.put(url + '/' + id, data, _options)
            .toPromise()
            .then((res) => {
                return res.json() || {};
            });
    }

    insert(data: Object) {
        const _options = new RequestOptions({headers: this.header});
        const url = this.url;
        return this.http.post(url + '/', data, _options)
            .toPromise()
            .then((res) => {
                return res.json() || {};
            });
    }
}