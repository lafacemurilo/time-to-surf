import "./util/module-alias";
import { Server } from "@overnightjs/core";
import express from "express";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  //método responsável por iniciar o servidor
  public init(): void {
    this.setupExpress();
  }
  //método responsável por iniciar o setupExpress
  //é como se fosse o middle. se não for um
  private setupExpress(): void {
    this.app.use(express.json());
  }
}
