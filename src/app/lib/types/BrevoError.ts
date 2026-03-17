export type BrevoError = {
  statusCode: number;
  message: string;
};

export const isBrevoError = (error: unknown): error is BrevoError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "message" in error &&
    typeof error.statusCode === "number" &&
    typeof error.message === "string"
  );
};
