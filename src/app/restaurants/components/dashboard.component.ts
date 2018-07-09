import {Component, OnInit} from "@angular/core";
import { AppHttpService } from '../../app-http.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    constructor(private httpService: AppHttpService) {}

    ngOnInit(){}


    download(e) {
        e.preventDefault();
        this.httpService.builder('restaurants/download').download()
            .then((res) => {
                // alert('download successfull');
                //window.open(res.full);
                console.log(res);
            });
    }

}

