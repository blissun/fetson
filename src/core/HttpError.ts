export class HttpError extends Error {
  response: Response;

  constructor(response: Response) {
    super(`HTTP error: ${response.status}`);
    this.name = "HttpError";
    this.response = response;
  }
}
