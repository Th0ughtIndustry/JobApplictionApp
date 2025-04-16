import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { JobApplicationsComponent } from "./components/job-applications/job-applications.component";
import { MatTableModule } from "@angular/material/table";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, JobApplicationsComponent, MatTableModule],
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "job-tracker-client";
}
