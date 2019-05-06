import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from './settings.service';
import { UserService } from '../../core/user.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

interface User {
  name?: string;
  email: string;
  picture: string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [SettingsService]
})
export class SettingsComponent implements OnInit {
  @ViewChild('image') image: ElementRef;
  private base64textString: String;
  public base64textStringImage: String;
  modalRef: BsModalRef;
  public user: User;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private modalService: BsModalService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = this.route.snapshot.data.user;
    this.croppedImage = this.user.picture;
  }

  ngOnInit() {
  }

  logout() {
    this.authService.clearTokens();
    this.router.navigate(['/login'], { replaceUrl: true });
  }


  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
      this.croppedImage = image;
  }
  imageLoaded() {
  }

  saveImage($event) {
  }

  editImage(template: TemplateRef<any>){
      this.modalRef = this.modalService.show(template);
      this.modalService.onShow.subscribe(res => {});
      // this.modalService.onHide.subscribe(res => {
      // })
  }


  // _handleReaderLoaded(readerEvt) {
  //   var binaryString = readerEvt.target.result;
  //   this.base64textString = btoa(binaryString);
  //   // console.log(btoa(binaryString));
  //   // console.log(this.base64textString);
  //   // console.log(this.image.nativeElement);
  //   this.base64textStringImage = binaryString;
  //   // this.settingsService.saveImage({ picture: this.base64textStringImage }).subscribe(res => {
  //   //   console.log(res);
  //   // });
  // }
}
