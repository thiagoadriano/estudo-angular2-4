import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRouter: Routes = [
    {
        path: "",
        redirectTo: "/contato",
        pathMatch: "full"
    }
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRouter)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {}