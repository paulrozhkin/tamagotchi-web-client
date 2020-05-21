import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FileInfo} from '../models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private httpClient: HttpClient) {
  }

  getFileUrl(imageId: number) {
    return `${environment.api_url}/files/${imageId}`;
  }

  fileUpload(file: File): Observable<number> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);

    return this.httpClient.post<FileInfo>(`${environment.api_url}/files`, uploadData, {headers: {'IS-FILE': 'isFile'}}).pipe(
      map(fileInfoAny => fileInfoAny.id)
    );
  }

  /**
   * Загрузить релиз на сервер.
   * @param file apk файл.
   * @param isStaffApk загружается приложение для персонала (по умолчанию загружается клиентское).
   */
  releaseUpload(file: File, isStaffApk: boolean = false): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);

    let url = `${environment.api_url}/files/release/client-android-app/`;
    if (isStaffApk) {
      url = `${environment.api_url}/files/release/staff-android-app/`;
    }

    return this.httpClient.post<FileInfo>(url,
      uploadData, {headers: {'IS-FILE': 'isFile'}});
  }

  getReleaseClientUrl(): string {
    return `${environment.api_url}/files/release/staff-android-app/`;
  }

  getReleaseStaffUrl(): string {
    return `${environment.api_url}/files/release/client-android-app/`;
  }
}
