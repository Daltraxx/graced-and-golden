type BrevoErrorBody = {
  code: string;
  message: string;
};

export type BrevoError = {
  statusCode: number;
  message: string;
  body: BrevoErrorBody;
};

export const isBrevoError = (error: unknown): error is BrevoError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "message" in error &&
    "body" in error &&
    typeof error.statusCode === "number" &&
    typeof error.message === "string" &&
    typeof error.body === "object" &&
    error.body !== null &&
    "code" in error.body &&
    "message" in error.body &&
    typeof error.body.code === "string" &&
    typeof error.body.message === "string"
  );
};
