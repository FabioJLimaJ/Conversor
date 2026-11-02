import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Service()
export class Conversor {

    private apiUrl = 'http://127.0.0.1:8000';
    private http = inject(HttpClient);

    enviarArquivo(formData: FormData):Observable<any> {
        return this.http.post(`${this.apiUrl}/upload`, formData, {
            responseType: 'blob'
        });
    }

}
