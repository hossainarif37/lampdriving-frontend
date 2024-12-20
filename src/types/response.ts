export interface IResponseBase {
    success: boolean;
    status: number;
    message: string;
}

export interface IResponseWithData<T> {
    success: boolean;
    status: number;
    message: string;
    data: T;
}

export interface IPaginationMeta {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
};

export interface IResponseWithPaginationData<T> {
    success: boolean;
    status: number;
    message: string;
    data: {
        meta: IPaginationMeta;
        result: T;
    };
}