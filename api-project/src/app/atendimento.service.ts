import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Atendimento } from 'src/app/atendimento';


@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
    api = 'http://localhost:3000/atendimento';

    constructor(private httpClient: HttpClient) { }

    // Headers
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    // Save atendimento
      // tslint:disable-next-line:typedef
      saveAtendimento(atendimento: Atendimento): Observable<Atendimento> {
        console.log( JSON.stringify(atendimento));
        return this.httpClient.post<Atendimento>(this.api, JSON.stringify(atendimento), this.httpOptions)
          .pipe(
            retry(2),
            catchError(this.handleError)
          );
      }
      // Busca atendimento
      getAtendimento(): Observable<Atendimento[]> {
        return this.httpClient.get<Atendimento[]>(this.api)
          .pipe(
            retry(2),
            catchError(this.handleError));
      }
      getAtendimentoById(id: string): Observable<Atendimento> {
        return this.httpClient.get<Atendimento>(this.api + '/' + id)
          .pipe(
            retry(2),
            catchError(this.handleError)
          );
      }
      // Atualizar atendimento
      updateAtendimento(atendimento: Atendimento): Observable<Atendimento> {
        return this.httpClient.put<Atendimento>(this.api + '/' + atendimento.id, JSON.stringify(atendimento), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          );
      }
      // Deletar atendimento
      // tslint:disable-next-line:typedef
      deleteAtendimento(atendimento: Atendimento) {
        return this.httpClient.delete<Atendimento>(this.api + '/' + atendimento.id, this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          );
      }
      // Manipulação de erros
      // tslint:disable-next-line:typedef
      handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Erro ocorreu no lado do client
          errorMessage = error.error.message;
          console.log(errorMessage, 'Client Error');
        } else {
          // Erro ocorreu no lado do servidor
          errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
          console.log(errorMessage, 'Server Error');
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      }

    }


