export class User {

  constructor(
      public name: string,
      public surname: string,
      public email: string,
      public password: string,
      public img?: string,
      public role?: string,
      public _id?: string
  ) {}

}
