import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atendimento } from 'src/app/atendimento';
import { AtendimentoService } from 'src/app/atendimento.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {
  atendimento = {} as Atendimento;
  atendimentos: Atendimento[];

  constructor(private atendimentoService: AtendimentoService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAtendimento();
  }

  // defini se um carro será criado ou atualizado
  // tslint:disable-next-line:typedef
  saveAtendimento(form: NgForm) {
    if (this.atendimento.id !== undefined){
      this.atendimentoService.updateAtendimento(this.atendimento).subscribe(() => {
        this.cleanForm(form);
    });
  }


    else {this.atendimentoService.saveAtendimento(this.atendimento).subscribe(() => {
      this.cleanForm(form);
    });
  }
  }

  // Chama o serviço para obtém todos os carros
  // tslint:disable-next-line:typedef
  getAtendimento() {
    this.atendimentoService.getAtendimento().subscribe((atendimentos: Atendimento[]) => {
      this.atendimentos = atendimentos;
    });
  }

  // deleta um carro
  // tslint:disable-next-line:typedef
  deleteAtendimento(atendimento: Atendimento) {
    this.atendimentoService.deleteAtendimento(atendimento).subscribe(() => {
      this.getAtendimento();
    });
  }

  // copia o carro para ser editado.
  // tslint:disable-next-line:typedef
  editAtendimento(atendimento: Atendimento) {
    this.atendimento = { ...atendimento };
  }

  // limpa o formulario
  // tslint:disable-next-line:typedef
  cleanForm(form: NgForm) {
    form.resetForm();
    this.atendimento = {} as Atendimento ;
    }

}
