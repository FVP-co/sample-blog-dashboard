import { toast } from "@/components/ui/toast";
import { AxiosError, isAxiosError } from "axios";

export class ApiError extends Error {
  public readonly statusCode: number = 0;
  private _displayMessage: string = "Unexpected error caused";
  private _errorPayload = {
    message: "",
    statusCode: "",
    url: "",
    method: "",
    causedAt: new Date().toISOString(),
  };

  constructor(error: Error | AxiosError) {
    super();
    if (!isAxiosError(error)) return this;

    this.statusCode = error.status || 0;
    this._displayMessage =
      error.response?.data?.message ?? this._displayMessage;

    this._errorPayload = {
      message: this._displayMessage,
      statusCode: String(this.statusCode),
      url: (error as AxiosError).config?.url ?? "",
      method: (error as AxiosError).config?.method ?? "",
      causedAt: new Date().toISOString(),
    };
  }

  showToast() {
    if (this.statusCode === 0) {
      return toast.add({
        title: "Application exception !",
        description: this._displayMessage,
        type: "error",
        priority: "high",
      });
    }
    return toast.add({
      title:
        this.statusCode === 500
          ? "Server has been fucked up 🖕"
          : "Server error !",
      description: this._displayMessage,
      type: "error",
      priority: "high",
      actionProps: {
        children: "copy",
        onClick: () => {
          window.navigator.clipboard.writeText(
            JSON.stringify(this._errorPayload),
          );
          toast.add({
            title: "Copied to clipboard !",
            description: "Error payload copied to clipboard",
            type: "success",
            priority: "high",
            timeout: 2000,
          });
        },
      },
    });
  }

  get redirectTo() {
    switch (this.statusCode) {
      case 401:
        return "/auth/login";
      default:
        return "";
    }
  }
}
