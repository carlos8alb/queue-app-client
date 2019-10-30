import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MailService } from 'src/app/services/mail/mail.service';
import { Mail } from 'src/app/models/mail';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styles: []
})
export class SiteComponent implements OnInit {

  year = new Date().getFullYear();
  public name = '';
  public email = '';
  public subject = '';
  public message = '';

  constructor(
    // tslint:disable-next-line: variable-name
    public _mail: MailService
  ) { }

  ngOnInit() {
    init_plugins();
  }

  onSubmit(contactForm: NgForm) {

    if (!contactForm.invalid) {

      const mail = new Mail(contactForm.value.email, 'carlos8_alb@hotmail.com',
                            contactForm.value.name + ' - ' + contactForm.value.email  + ': ' + contactForm.value.subject,
                            contactForm.value.message);

      this._mail.send(mail).subscribe(() => {
        Swal.fire('', '¡El mensaje fue enviado con éxito! Te contestaremos a la brevedad', 'success');
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
      });

    }


  }

}
