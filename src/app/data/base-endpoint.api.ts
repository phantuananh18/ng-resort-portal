export class BaseEndpoint {
    private readonly baseEndpoint: string = "https://localhost:44344/api/";

    private controller: string;

    constructor(ctrl: string) {
        this.controller = ctrl;
    }

    get Root_URL() {
        return this.baseEndpoint + this.controller + "/";
    }
}
