import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class Jsonbin {
    url: string;
    option: {};

    constructor(private http: HttpClient, token: string, url="https://jsonbin.org/me/todolist") {
        this.url = url;
        this.option = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            })
        }
    }

    get(): Observable<any> {
        return this.http.get(this.url, this.option)
    }
    post(data: any): Observable<any> {
        return this.http.post<any>(this.url, data, this.option)
    }
}