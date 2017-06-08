import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ContatoRoutingModule } from "./contato-routing.module";
import { FormsModule } from "@angular/forms";

import { ContatosListaComponent } from './contatos-lista.component';
import { ContatoDetalheComponent } from "./contato-detalhe.component";

import { ContatoService } from "./contato.service";

@NgModule({
    imports:[
        CommonModule,
        ContatoRoutingModule,
        FormsModule
    ],
    declarations: [
        ContatosListaComponent,
        ContatoDetalheComponent
    ],
    exports: [
        ContatosListaComponent
    ], 
    providers: [
        ContatoService
    ]
})
export class ContatosModule {}