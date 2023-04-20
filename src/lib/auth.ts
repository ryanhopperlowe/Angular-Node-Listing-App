import { HttpHeaders } from "@angular/common/http";

export interface HttpOptions {
  headers: HttpHeaders;
}

export const httpOptions: HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

export const httpOptionsWithAuthToken = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'AuthToken': token,
    'Authorization': token
  })
})
