export interface ResponseModel<T = any> {
    success: boolean;
    message: string | null;
    code: number | string;
    data: T;
}
