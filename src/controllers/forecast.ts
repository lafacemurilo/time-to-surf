import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller('forecast')
export class ForecastController {
    
    @Get('')
    public getForecasrForLoggedUser(_: Request, res : Response): void {
         
    }
}
