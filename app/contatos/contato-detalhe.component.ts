import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { ContatoService } from "./contato.service";
import { Contato } from "./contato.model";

@Component({
    moduleId: module.id,
    selector: "contato-detalhe",
    templateUrl: "contato-detalhe.component.html"
})
export class ContatoDetalheComponent implements OnInit {
    public contato:Contato;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private contatoService: ContatoService
    ){}

    ngOnInit():void{
        this.contato = new Contato(0, '', '', '');
        this.route.params.forEach((param: Params) => {
            let id:number = +param['id'];
            if(id){
                this.contatoService.getContato(id)
                    .then((contato: Contato) => {
                        this.contato = contato;
                    });
            }
        });
    }

    getFormGroupClass(isValid: boolean, isPristine:boolean):object{
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        }
    }


    getFormControlClass(isValid: boolean, isPristine:boolean):object{
        return {
            'form-control': true,
            'form-control-danger': !isValid && !isPristine,
            'form-control-success': isValid && !isPristine
        }
    }

    log(){
        console.log(this.contato)
    }
}