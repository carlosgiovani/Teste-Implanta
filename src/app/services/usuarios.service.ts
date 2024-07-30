import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  urlAPI = 'http://localhost:3000/usuarios';

  private subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  adicionarUsuario(data: any): Observable<any> {
    return this.http.post(this.urlAPI, data);
  }

  atualizarUsuario(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/usuarios/${id}`, data);
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(this.urlAPI);
  }

  deletarUsuario(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/usuarios/${id}`);
  }

  enviarDados(dados: any) {
    this.subject.next(dados);
  }
  obterDados() {
    return this.subject.asObservable();
  }
}
