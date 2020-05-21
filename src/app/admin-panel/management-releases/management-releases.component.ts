import {Component, OnInit} from '@angular/core';
import {FilesService} from '../../core/services';

@Component({
  selector: 'app-management-releases',
  templateUrl: './management-releases.component.html',
  styleUrls: ['./management-releases.component.css']
})
export class ManagementReleasesComponent implements OnInit {

  public selectedClientAPKFile: File;
  public selectedStaffAPKFile: File;

  public isUploading = false;

  public isClientUploadError = false;
  public isClientUploadSuccess = false;

  public isStaffUploadError = false;
  public isStaffUploadSuccess = false;

  constructor(private filesService: FilesService) {
  }

  ngOnInit(): void {
  }

  onFileChangedClientRelease(files: FileList) {
    this.selectedClientAPKFile = files[0];
  }

  onFileChangedStaffRelease(files: FileList) {
    this.selectedStaffAPKFile = files[0];
  }

  submitClientApkUpload() {
    this.isUploading = true;
    this.filesService.releaseUpload(this.selectedClientAPKFile).subscribe(
      fileResult => {
        this.isUploading = false;
        this.isClientUploadError = false;
        this.isClientUploadSuccess = true;
      },
      error => {
        this.isUploading = false;
        this.isClientUploadError = true;
        this.isClientUploadSuccess = false;
      });
  }

  submitStaffApkUpload() {
    this.isUploading = true;
    this.filesService.releaseUpload(this.selectedStaffAPKFile, true).subscribe(
      fileResult => {
        this.isUploading = false;
        this.isStaffUploadError = false;
        this.isStaffUploadSuccess = true;
      },
      error => {
        this.isUploading = false;
        this.isStaffUploadError = true;
        this.isStaffUploadSuccess = false;
      });
  }
}
