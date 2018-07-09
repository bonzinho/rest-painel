import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppHttpService} from '../../app-http.service';
import {environment} from '../../../environments/environment';


@Injectable()
export class AuthService extends AppHttpService {
    eventEmitter: EventEmitter<any> = new EventEmitter();

    builder(resource: string = '') {
        return super.builder('auth' + resource);
    }

    getUser() {
        return this.builder('/me').list();
    }

    changePassword(data) {
        let observable = this.http.post(this.url + '/change-password', data, {headers: this.header});
        return this.toPromise(observable);
    }

    changeProfile(data) {
        let observable = this.http.post(this.url + '/change-profile', data, {headers: this.header});
        return this.toPromise(observable);
    }

    login(data) {
        let observable = this.http.post(environment.server_url + '/oauth/token', data);
        return this.toPromise(observable).then((res) => {
            document.cookie = 'token=' + res.access_token + '; expires=' + res.expires_in;
            return super.setAccessToken().then(() => {
                this.eventEmitter.emit();
            });
        });
    }

    logout() {
        let observable = this.http.get(this.url + '/logout', {headers: this.header});
        return this.toPromise(observable).then((res) => {
            // Emitir uma alteração neste component/serviço
            this.eventEmitter.emit();
            return res;
        });
    }
}