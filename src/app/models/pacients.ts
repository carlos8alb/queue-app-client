export class Pacient {

  constructor(
      public dni: string,
      public name: string,
      public surname: string,
      public birthday: string,
      public user: string,
      public address?: string,
      public socialInsureance?: string,
      public placeAppointment?: string,
      public sex?: string,
      public email?: string,
      public contactNumber?: string,
      public img?: string,
      public _id?: string
  ) {}

}
