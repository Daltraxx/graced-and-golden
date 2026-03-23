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
    typeof (error as BrevoError).body === "object" &&
    (error as BrevoError).body !== null &&
    "code" in (error as BrevoError).body &&
    "message" in (error as BrevoError).body &&
    typeof (error as BrevoError).body.code === "string" &&
    typeof (error as BrevoError).body.message === "string"
  );
};
