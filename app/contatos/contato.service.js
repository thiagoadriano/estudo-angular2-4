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
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
let ContatoService = class ContatoService {
    constructor(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    getContatos() {
        return this.http.get("app/contatos")
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
    getContato(id) {
        return this.getContatos()
            .then((contatos) => contatos.find((contato) => contato.id === id));
    }
    create(contato) {
        let idNovo = null;
        this.getContatos().then((contatos) => idNovo = contatos.length);
        contato.id = idNovo;
        return this.http.post("app/contatos", JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then((response) => response.json().data)
            .catch(this.handleError);
    }
    update(contato) {
        return this.http.put(`app/contatos/${contato.id}`, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handleError);
    }
    delete(contato) {
        return this.http.delete(`app/contatos/${contato.id}`, { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handleError);
    }
    getContatosSlowly() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        }).then(() => {
            console.log("Primeiro Then");
            return "Retorno Primeiro Then";
        }).then((param) => {
            console.log("Segundo then");
            console.log(param);
            console.log("segunda chamada a promise");
            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log("Terminou a chamada");
                    resolve2();
                });
            });
        }).then(() => {
            console.log("Acessa o terceiro then");
            return this.getContatos();
        });
    }
    handleError(error) {
        return Promise.reject(error.message || error);
    }
};
ContatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato.service.js.map