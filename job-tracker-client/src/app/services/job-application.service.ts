import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface JobApplication {
    id?: number;
    companyName: string;
    position: string;
    status: JobStatus;
    dateApplied: string;
}

export enum JobStatus {
    Applied,
    Interview,
    Offer,
    Rejected,
}

@Injectable({
    providedIn: "root",
})
export class JobApplicationService {
    private apiUrl = "http://localhost:5107/applications";

    constructor(private http: HttpClient) {}

    getJobApplications(): Observable<JobApplication[]> {
        console.log("Fetching job applications from API...");
        return this.http.get<JobApplication[]>(`${this.apiUrl}`).pipe(
            catchError((error) => {
                console.error("Error fetching job applications:", error);
                return throwError(error);
            })
        );
    }

    async addJobApplication(jobApplication: JobApplication): Promise<void> {
        console.log("Adding job application:", jobApplication);
        return this.http
            .post<void>(`${this.apiUrl}`, jobApplication)
            .pipe(
                catchError((error) => {
                    console.error("Error adding job application:", error);
                    return throwError(error);
                })
            )
            .toPromise();
    }

    async editJobApplication(jobApplication: JobApplication): Promise<void> {
        console.log("Editing job application:", jobApplication);
        return this.http
            .put<void>(`${this.apiUrl}/${jobApplication.id}`, jobApplication)
            .pipe(
                catchError((error) => {
                    console.error("Error updating job application:", error);
                    return throwError(error);
                })
            )
            .toPromise();
    }
}
