import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {
    JobApplication,
    JobApplicationService,
    JobStatus,
} from "../../services/job-application.service";
import { AddApplicationModalComponent } from "../add-application-modal/add-application-modal.component";

@Component({
    selector: "app-job-applications",
    templateUrl: "./job-applications.component.html",
    styleUrls: ["./job-applications.component.scss"],
    standalone: true,
    imports: [CommonModule, MatTableModule, MatDialogModule, MatPaginator],
})
export class JobApplicationsComponent {
    jobApplications: JobApplication[] = [];
    displayedColumns: string[] = [
        "companyName",
        "position",
        "status",
        "dateApplied",
    ];
    dataSource = new MatTableDataSource<JobApplication>(this.jobApplications);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private jobApplicationService: JobApplicationService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.fetchJobApplications();
    }

    fetchJobApplications(): void {
        this.jobApplicationService.getJobApplications().subscribe({
            next: (applications) => {
                this.jobApplications = applications;
                this.dataSource.data = this.jobApplications;
            },
            error: (error) => {
                console.error("Error fetching job applications:", error);
            },
        });
    }

    openAddApplicationModal(): void {
        const dialogRef = this.dialog.open(AddApplicationModalComponent, {
            width: "800px",
            height: "600px",
            data: { title: "Add New Application" },
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
                const jobApplication: JobApplication = {
                    companyName: result.companyName,
                    position: result.position,
                    status: JobStatus.Applied,
                    dateApplied: new Date().toISOString(),
                };
                await this.jobApplicationService.addJobApplication(
                    jobApplication
                );
            }
            this.fetchJobApplications();
        });
    }

    openEditApplicationModal(job: any): void {
        const dialogRef = this.dialog.open(AddApplicationModalComponent, {
            width: "800px",
            height: "600px",
            data: { title: "Edit Application", job: job },
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
                const jobApplication: JobApplication = {
                    id: job.id,
                    companyName: result.companyName,
                    position: result.position,
                    status: result.status,
                    dateApplied: job.dateApplied,
                };
                await this.jobApplicationService.editJobApplication(
                    jobApplication
                );
            }
            this.fetchJobApplications();
        });
    }
}
