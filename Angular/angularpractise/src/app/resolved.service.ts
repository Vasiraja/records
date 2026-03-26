import { inject } from "@angular/core";

import { ResolveFn } from "@angular/router";

import { Auth } from "./services/auth";


export const resolverFn: ResolveFn<any> = (route, state) => {

    const serviceFile = inject(Auth);
    const id = route.paramMap.get('id')!;
    return serviceFile.getUserProfile(id);

}