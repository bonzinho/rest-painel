//Centraliza todas as requisições
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {environment} from '../environments/environment';

import 'rxjs/add/operator/toPromise'; //importar promisses

@Injectable()

export class AppHttpService {

    /* protecteed so tem acesso esta classe e outras classes que tenham herança come sta classe */

    protected  header: Headers;
    protected  url: string;

    constructor(protected http: Http){
        this.setAccessToken();
    }

    setAccessToken() {
        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk5MzkzMzYwYzkyODExYzI2MGM0MjVlNDI5M2Y4MjdjY2MxM2ZkYjBiZjViYTdjNDNhZDZmMjY4MTViNDVmYzg1NDhmMTQ2MzRjMTY2NzczIn0.eyJhdWQiOiI1IiwianRpIjoiOTkzOTMzNjBjOTI4MTFjMjYwYzQyNWU0MjkzZjgyN2NjYzEzZmRiMGJmNWJhN2M0M2FkNmYyNjgxNWI0NWZjODU0OGYxNDYzNGMxNjY3NzMiLCJpYXQiOjE1MjU3NzMyMDUsIm5iZiI6MTUyNTc3MzIwNSwiZXhwIjoxNTU3MzA5MjA0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VLRVelYQ3GQ0EMmojpY1JP_LBMpzl8hF0v_KgkHndEh54dJoo6qn8PAhCY9DYIt1tw0jhfOOLOUfMZyK19Tb40Ii8UKwmpL9G34Fo2fBO8T9k4NePH_hFXW_MyBoR37V3x7nTr0kQDbY1w5cXjfAJxYWjumuct-49UtT5h97l19M488SkuUioZlYdzZHG9kYai1jKaOWXmc4AQgZhJoKteU0WnIGXYomt3gXBR3g165qG9DiPRK8Fvc2glwt307v1LZv-QSroadnZNyJ7IYkrbSYOyBgSPH5AI9zyje-b9UQpDym-dnfpoECi6MEvhqNC-R8KvQgiGdyW2mKdKb6Dr99in95eBmfc0A415v4VO12H5uVyBPy4FamNBoOo8v82jKg57T0MHinPsdZuUrB_nRCfnKv_J15qppa8ZWfC7-YkWvQJNSEKK9R0Qxn5C1AEHm8Of_n5vjfEG5vlCM-uF2VapfA6Nh2SC0V2EPjKsj3kF4j-iAWBduNY5Z-FPRe2dVIo9TjumPF0N1VgHQ5xxzCvdYFjufyIH_KFY8pXXCB_5nH9feNNR-TgqwA2eV64d9A9Ur7kgF9CgB7zoOWp_yJKL4vEE9W-n1V0hvvwEKvuS_8SWSa1G_vKm8PVQpeHLuUA7dMgWsOBdy-K7zuIFG0LKcIEGwA6JrutoZCk6M";
        this.header = new Headers({'Authorization': 'Bearer' + token});
    }

    // Construtor de rotas para as requisições
    builder(resource: string) {
        this.url = environment.server_url + '/api/v1/' + resource;
        return this;
    }

    list(options: Object = {}) {
        return this.http.get(this.url, {header: this.header})
            .toPromise()
            .then((res) => {
                return res.json() || {};
            });
    }
}