import { Request, Response } from "express";
import CreateSessionService from "../../../services/CreateSessionService";

export default class SessionController {

constructor(private createSession: CreateSessionService) {}
public async create(request: Request, response: Response) : Promise<Response> {

  const { email, password } = request.body;

  const user = await this.createSession.execute({email, password});

  return response.json(user);
}

}
