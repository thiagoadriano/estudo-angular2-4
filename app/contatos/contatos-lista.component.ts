import { Component, OnInit } from '@angular/core';
import { ContatoService } from "./contato.service";
import { Contato } from "./contato.model";
import { DialogService } from "./../dialog.service";

@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit{
    contatos:Contato[];

    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService
    ){}

    ngOnInit():void{
       this.contatoService.getContatos()
                .then((contatos: Contato[]) => {
                    this.contatos = contatos;
                })
                .catch(err => console.log(err));

    }

    onDelete(contato: Contato){
        this.dialogService.confirm(`Deseja deletar o contato ${contato.nome}?`)
            .then((canDelete:boolean) => {
                if(canDelete){
                    this.contatoService.delete(contato)
                        .then(() => {
                            this.contatos = this.contatos.filter((c:Contato) => c.id !== contato.id);
                        })
                        .catch((err) => {
                            console.log(err);
                        });               
                }
            });
    }
}