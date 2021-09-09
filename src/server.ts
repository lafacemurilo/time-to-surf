import { ForecastController } from './controllers/forecast';
import "./util/module-alias";
import { Server } from "@overnightjs/core";
import express, { Application } from "express";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  //método responsável por iniciar o servidor
  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }
  //método responsável por iniciar o setupExpress
  //é como se fosse o middle. se não for um
  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupControllers():void {
    const forecastControllers = new ForecastController();
    this.addControllers([forecastControllers]);
  }

  public getApp(): Application{
    return this.app;
  }
}
