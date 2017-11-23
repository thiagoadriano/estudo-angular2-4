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
    public contato: Contato;
    private isNew: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private contatoService: ContatoService
    ) { }

    ngOnInit(): void {
        this.contato = new Contato(0, '', '', '');
        this.route.params.forEach((param: Params) => {
            let id: number = +param['id'];
            if (id) {
                this.isNew = false;
                this.contatoService.find(id)
                    .then((contato: Contato) => {
                        this.contato = contato;
                    });
            }
        });
    }

    getFormGroupClass(isValid: boolean, isPristine: boolean): {} {
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        }
    }


    getFormControlClass(isValid: boolean, isPristine: boolean): {} {
        return {
            'form-control': true,
            'form-control-danger': !isValid && !isPristine,
            'form-control-success': isValid && !isPristine
        }
    }

    onSubmit(): void {
        let promise;
        if (this.isNew) {
            promise = this.contatoService.create(this.contato);
        } else {
            promise = this.contatoService.update(this.contato);
        }
        promise.then(contato => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}