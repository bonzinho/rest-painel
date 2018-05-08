import {Component, OnInit} from "@angular/core";
import {Router} from  "@angular/router";
import * as jQuery from 'jquery'; //importar o jquery

@Component({
    selector: 'app-edit-dishe',
    templateUrl: './edit-dishe.component.html'
})

export class EditDisheComponent implements OnInit {

    constructor(private router: Router) {}


    ngOnInit(){
        jQuery('.modal').modal({complete: () => this.router.navigate(['/dishes'])}); // inicializar o modal e definir que quando fechar o modal volta para o dashboard
        jQuery('.modal').modal('open'); // abrir o modal
    }
}