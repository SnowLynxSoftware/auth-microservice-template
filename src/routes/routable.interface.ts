import { Router } from "express";

export interface IRoutable {
  router: Router;
  prefix: string;
}
