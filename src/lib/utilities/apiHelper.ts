export interface APIProps {
  url: string;
  method: string;
  body?: any;
  headers?: any;
  params?: any;
  onSuccess?: Function;
  onError?: Function;
  onCancel?: Function;
}

export interface APICompletion {
  status: number;
  data: any;
  success: boolean;
  errorMessage?: string;
}

export interface SurveyPostObject {
  SurveyId: string;
  SurveyLabel: string;
  ResponseText: string;
  ResponseValue: string;
  isRequired?: boolean;
}

export const API_HEADERS: any = {
  baseHeaders: {
    "Content-Type": "application/json",
  },
};
export async function apiHandler(props: APIProps) {
  try {
    const response = await fetch(props.url, {
      method: props.method,
      body: props.body,
      headers: props.headers,
    });

    const json = await response.json();
    const completion: APICompletion = {
      status: response.status,
      data: json,
      success: response.status >= 200 && response.status < 300 ? true : false,
      errorMessage: json.message,
    };
    return completion;
  } catch (error) {
    const completion: APICompletion = {
      status: 500,
      data: error,
      success: false,
      errorMessage: "Something went wrong",
    };

    return completion;
  }
}

export async function postApplication(props: APIProps) {
  try {
    const response = await fetch(props.url, {
      method: props.method,
      body: props.body,
      headers: props.headers,
    });

    const json = await response.json();
    const completion: APICompletion = {
      status: response.status,
      data: json,
      success: response.status >= 200 && response.status < 300 ? true : false,
      errorMessage: json.message,
    };

    return completion;
  } catch (error) {
    const completion: APICompletion = {
      status: 500,
      data: error,
      success: false,
      errorMessage: "Something went wrong",
    };

    return completion;
  }
}
