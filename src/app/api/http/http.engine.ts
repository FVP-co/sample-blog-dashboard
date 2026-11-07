import type { AxiosInstance } from "axios";
import axios from "axios";

export class HttpEngine {
  private _http: AxiosInstance;

  private constructor() {
    this._http = axios.create({
      baseURL: import.meta.env.APP_BASE_URL,
    });
  }

  public get http() {
    return this._http;
  }

  private static _instance: HttpEngine | null = null;

  public static getInstance() {
    if (!HttpEngine._instance) {
      HttpEngine._instance = new HttpEngine();
    }
    return HttpEngine._instance;
  }

  public static get http() {
    return HttpEngine.getInstance().http;
  }
}
