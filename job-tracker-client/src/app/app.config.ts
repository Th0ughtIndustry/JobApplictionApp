import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import {
    provideClientHydration,
    withEventReplay,
} from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { JobApplicationsComponent } from "../app/components/job-applications/job-applications.component";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter([{ path: "", component: JobApplicationsComponent }]),
        provideClientHydration(withEventReplay()),
        provideHttpClient(),
    ],
};
