export class GlobalVariables {
  public static passwordPattern: string =
    '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$';
  public static emailPattern: string =
    '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public static baseUrl: string = 'http://localhost:7070';
}
