export default class UserState {
  private id: number;
  private name: string;
  private subjectCode: string;
  private request: "QP" | "A" | "N" | null;

  constructor(id: number) {
    this.id = id;
    this.name = "";
    this.subjectCode = "";
    this.request = null;
  }

  get userId() {
    return this.id;
  }

  get userName() {
    return this.name;
  }

  set userName(name: string) {
    this.name = name;
  }

  get userSubjectCode() {
    return this.subjectCode;
  }

  set userSubjectCode(subjectCode: string) {
    this.subjectCode = subjectCode;
  }

  get userRequest() {
    return this.request;
  }

  set userRequest(request: "QP" | "A" | "N" | null) {
    this.request = request;
  }
}
