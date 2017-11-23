import { Component, OnInit } from '@angular/core';
import { ContatoService } from "./contato.service";
import { Contato } from "./contato.model";
import { DialogService } from "./../dialog.service";

@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit {
    contatos: Contato[] = [];
    mensagem: {};
    classesCss: {};
    private currentTimeout;
    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService
    ) { }

    ngOnInit(): void {
        this.contatoService.findAll()
            .then((contatos: Contato[]) => {
                this.contatos = contatos;
            })
            .catch(err => {
                console.log(err);
                this.mostrarMensagem({
                    tipo: 'danger',
                    texto: `Ocorreu um erro ao buscar a lista de contatos: ${err}`
                });
            });

    }

    onDelete(contato: Contato) {
        this.dialogService.confirm(`Deseja deletar o contato ${contato.nome}?`)
            .then((canDelete: boolean) => {
                if (canDelete) {
                    this.contatoService.delete(contato)
                        .then(() => {
                            this.mostrarMensagem({
                                tipo: 'success',
                                texto: "Contato Deletado!"
                            });
                            this.contatos = this.contatos.filter((c: Contato) => c.id !== contato.id);
                        })
                        .catch((err) => {
                            console.log(err);
                            this.mostrarMensagem({
                                tipo: 'danger',
                                texto: `Ocorreu um erro ao deletar o contato: ${err}`
                            });
                        });
                }
            });
    }

    private mostrarMensagem(mensagem: { tipo: string, texto: string }): void {
        this.mensagem = mensagem;
        this.montarClasse(mensagem.tipo);
        if (mensagem.tipo !== 'danger') {
            if (this.currentTimeout) {
                clearTimeout(this.currentTimeout);
            }
            this.currentTimeout = setTimeout(() => {
                this.mensagem = undefined;
            }, 3000)
        }
    }

    private montarClasse(tipo: string): void {
        this.classesCss = {
            'alert': true
        };
        this.classesCss[`alert-${tipo}`] = true;
    }
}