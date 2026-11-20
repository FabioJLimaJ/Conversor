import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Service()
export class Conversor {

    private apiUrl = '/api';
    private http = inject(HttpClient);

    enviarArquivo(formData: FormData):Observable<any> {
        return this.http.post(`${this.apiUrl}/upload`, formData, {
            responseType: 'blob'
        });
    }

}
