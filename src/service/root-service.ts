import { HttpEvent } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from "rxjs";
import { httpOptionsWithAuthToken } from "src/lib/auth";

export type User = {
  uid: string;
  email: string | null;
};

export class RootService {

  constructor(private authProvider: AngularFireAuth) {}

  protected authorized<T = unknown>(cb: (user: User, options: any) => Observable<HttpEvent<T>>) {
    return new Observable<T>((observer) => {
      this.authProvider.user.subscribe(async (user) => {
        if (user) {
          const token = await user.getIdToken();

          if (token) {
            const usr = {
              uid: user.uid,
              email: user.email
            };

            cb(usr, httpOptionsWithAuthToken(token))
              .subscribe((data) => observer.next(data as T));
          }
        }
      })
    })
  }
}