import { Injectable } from "@angular/core";
import { Contato } from "./contato.model";
import { CONTATOS } from "./contatos-mock";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContatoService{
    private headers: Headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http:Http){}

    getContatos():Promise<Contato[]>{
        return this.http.get("app/contatos")
                        .toPromise()
                        .then(response => response.json().data as Contato[] )
                        .catch(this.handleError);
    }

    getContato(id:number):Promise<Contato>{
        return this.getContatos()
                .then((contatos: Contato[]) => contatos.find( (contato:Contato)  => contato.id === id));
    }

    create(contato: Contato):Promise<Contato>{
        let idNovo = null;
        this.getContatos().then((contatos: Contato[]) => idNovo = contatos.length);
        contato.id = idNovo;
        return this.http.post("app/contatos", JSON.stringify(contato), {headers: this.headers})
                        .toPromise()
                        .then((response: Response) => response.json().data as Contato)
                        .catch(this.handleError);
    }

    update(contato: Contato):Promise<Contato>{
        return this.http.put(`app/contatos/${contato.id}`, JSON.stringify(contato), {headers: this.headers})
                        .toPromise()
                        .then(() => contato as Contato)
                        .catch(this.handleError);
    }

    delete(contato: Contato):Promise<Contato>{
        return this.http.delete(`app/contatos/${contato.id}`, {headers: this.headers})
                        .toPromise()
                        .then(() => contato as Contato)
                        .catch(this.handleError);
    }
    

    getContatosSlowly(): Promise<Contato[]>{
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        }).then(() => {
            console.log("Primeiro Then");
            return "Retorno Primeiro Then";
        }).then((param: string) => {
            console.log("Segundo then");
            console.log(param);
            console.log("segunda chamada a promise");
            
            return new Promise((resolve2, reject2) => {
                setTimeout(()=>{
                    console.log("Terminou a chamada");
                    resolve2();
                });
            });

        }).then(() => {
            console.log("Acessa o terceiro then");
            return this.getContatos();
        })
    }

    private handleError(error: any): Promise<any>{
        return Promise.reject(error.message || error);
    }
}