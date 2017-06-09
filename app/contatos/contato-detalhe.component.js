"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const contato_service_1 = require("./contato.service");
const contato_model_1 = require("./contato.model");
let ContatoDetalheComponent = class ContatoDetalheComponent {
    constructor(route, location, contatoService) {
        this.route = route;
        this.location = location;
        this.contatoService = contatoService;
        this.isNew = true;
    }
    ngOnInit() {
        this.contato = new contato_model_1.Contato(0, '', '', '');
        this.route.params.forEach((param) => {
            let id = +param['id'];
            if (id) {
                this.isNew = false;
                this.contatoService.getContato(id)
                    .then((contato) => {
                    this.contato = contato;
                });
            }
        });
    }
    getFormGroupClass(isValid, isPristine) {
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        };
    }
    getFormControlClass(isValid, isPristine) {
        return {
            'form-control': true,
            'form-control-danger': !isValid && !isPristine,
            'form-control-success': isValid && !isPristine
        };
    }
    onSubmit() {
        let promise;
        if (this.isNew) {
            promise = this.contatoService.create(this.contato);
        }
        else {
            promise = this.contatoService.update(this.contato);
        }
        promise.then(contato => this.location.back());
    }
};
ContatoDetalheComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "contato-detalhe",
        templateUrl: "contato-detalhe.component.html"
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location,
        contato_service_1.ContatoService])
], ContatoDetalheComponent);
exports.ContatoDetalheComponent = ContatoDetalheComponent;
//# sourceMappingURL=contato-detalhe.component.js.map