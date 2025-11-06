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
  interface ICategory {
    id: string;
    name: string;
    slug: string;
    categories?: ICategory[];
  }
  interface ITopic {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    slug: string;
    updatedAt: string;
  }
  interface ISearchData {
    topics: ITopic[];
    categories: ICategory[];
  }
  interface IBook {
    id: string;
    name: string;
    summary: string;
    url: string;
    coverImage: string;
    slug: string;
    author: string;
    isDownloaded: boolean;
  }
}
