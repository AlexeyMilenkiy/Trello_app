export interface Environment {
  production: boolean;
  baseUrl: string;
  baseClientUrl: string;
  pusher: {
    key: string;
    cluster: string;
  };
}
