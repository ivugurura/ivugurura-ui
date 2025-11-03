declare namespace APP {
  type HttpVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  interface IApi {
    endpoint: string;
    verb: HttpVerb;
    auth: boolean;
    hasBody: boolean;
    isDownload?: boolean;
    isMutation?: boolean;
  }
  interface IActionSchema {
    api: IApi;
  }
  type IAction = Record<string, Partial<IActionSchema>>;
  interface IState {
    entity: string;
    actions: IAction;
  }
  interface IQuery {
    url: string;
    method: HttpVerb;
    body?: Record<string, unknown>;
    responseHandler?: (response: Response) => Promise<unknown>;
  }
  interface IUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  }
}
