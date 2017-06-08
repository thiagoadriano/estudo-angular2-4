import { Injectable } from "@angular/core";
import { Contato } from "./contato.model";
import { CONTATOS } from "./contatos-mock";

@Injectable()
export class ContatoService{
    getContatos():Promise<Contato[]>{
        return Promise.resolve(CONTATOS);
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

    getContato(id:number):Promise<Contato>{
        return this.getContatos()
                .then((contatos: Contato[]) => contatos.find( (contato:Contato)  => contato.id === id));
    }
}