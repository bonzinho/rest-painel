import {Component, OnInit} from "@angular/core";
import * as jQuery from 'jquery'; //importar o jquery
import {Router} from  "@angular/router";
import Toast from 'materialize-css';

@Component({
    selector: 'app-evaluation',
    templateUrl: './evaluation.component.html'
})

export class EvaluationComponent implements OnInit {

    constructor(private router: Router){}

    ngOnInit() {

        jQuery('.modal').modal({complete: () => this.router.navigate(['/dashboard'])}); // inicializar o modal e definir que quando fechar o modal volta para o dashboard
        jQuery('.modal').modal('open'); // abrir o modal

    }

    save(e){
        e.preventDefault();
        window.Materialize.toast('Guardado com sucesso', 3000); // para funcionar é necessário declarar a interface no Main.ts (Ver inicio do documento Main.ts)
    }
}