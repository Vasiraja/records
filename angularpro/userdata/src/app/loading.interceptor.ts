import { finalize } from "rxjs";
import { Userserv } from "./services/userserv";
import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const userServ = inject(Userserv);
    console.log(' Request started:', req.url);
    userServ.show();

    return next(req).pipe(
        finalize(() => {
            console.log(' Request finished:', req.url);
            userServ.hide();
        })
    );
};