import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './dashboard.component';
import { EvaluationComponent } from './dashboard/evaluation.component';

import { DishesComponent } from './dishes.component';
import { NewDisheComponent } from './dishes/new-dishe.component';
import { EditDisheComponent } from './dishes/edit-dishe.component';

import { EditComponent } from './edit.component';
import { PasswordComponent } from './password.component';
import { ProfileComponent } from './profile.component';

const appRoutes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent,
            children: [ // Rotas filhos do componente Restaurants
                { path: 'evaluation/:id', component: EvaluationComponent }
            ]
    },
    {
        path: 'dishes', component: DishesComponent,
        children: [ // Rotas filhos do componente Restaurants
            { path: 'new', component: NewDisheComponent },
            { path: 'edit/:id', component: EditDisheComponent }
        ]
    },
    {path: 'edit', component: EditComponent},
    {path: 'password', component: PasswordComponent},
    {path: 'profile', component: ProfileComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        DashboardComponent,
        EvaluationComponent,
        DishesComponent,
        EditComponent,
        PasswordComponent,
        ProfileComponent,
        EditDisheComponent,
        NewDisheComponent,
    ]
})

export class RestaurantsModule{}