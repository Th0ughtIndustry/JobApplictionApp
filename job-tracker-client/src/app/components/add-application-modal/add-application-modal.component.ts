import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";

export enum Status {
    Applied = "Applied",
    Interview = "Interview",
    Offer = "Offer",
    Rejected = "Rejected",
}

@Component({
    selector: "app-add-application-modal",
    templateUrl: "./add-application-modal.component.html",
    styleUrls: ["./add-application-modal.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
    ],
})
export class AddApplicationModalComponent {
    form: FormGroup;
    title: string;
    statuses = Object.values(Status);

    constructor(
        private dialogRef: MatDialogRef<AddApplicationModalComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.title = data.title;
        const job = data.job || {};
        this.form = this.fb.group({
            companyName: [job.companyName || "", Validators.required],
            position: [job.position || "", Validators.required],
            status: [job.status || "", Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
