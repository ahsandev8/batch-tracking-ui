import axios from "axios";

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong.",
): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Unable to connect to the server. Please check your network connection.";
    }

    const detail = error.response.data?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail) && detail.length > 0) {
      return detail[0]?.msg || fallback;
    }

    if (error.response.status === 400) {
      return "Invalid request.";
    }

    if (error.response.status === 404) {
      return "The requested resource was not found.";
    }

    if (error.response.status >= 500) {
      return "The server is temporarily unavailable. Please try again.";
    }
  }

  return fallback;
};
