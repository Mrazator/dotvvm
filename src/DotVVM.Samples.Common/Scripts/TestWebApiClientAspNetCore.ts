namespace DotVVM.Samples.Common.Api.AspNetCore {
    class ClientBase {
        public transformOptions(options: RequestInit) {
            options.credentials = "same-origin";
            return Promise.resolve(options);
        }
    }
    /* tslint:disable */
    //----------------------
    // <auto-generated>
    //     Generated using the NSwag toolchain v11.12.13.0 (NJsonSchema v9.10.14.0 (Newtonsoft.Json v9.0.0.0)) (http://NSwag.org)
    // </auto-generated>
    //----------------------
    // ReSharper disable InconsistentNaming
    
    export class Client extends ClientBase {
        private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
        private baseUrl: string;
        protected jsonParseReviver: (key: string, value: any) => any = undefined;
    
        constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
            super();
            this.http = http ? http : <any>window;
            this.baseUrl = baseUrl ? baseUrl : "http://localhost:5001";
        }
    
        /**
         * @return Success
         */
        apiCompaniesGet(): Promise<Company[]> {
            let url_ = this.baseUrl + "/api/Companies";
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                })
            };
    
            return this.transformOptions(options_).then(transformedOptions_ => {
                return this.http.fetch(url_, transformedOptions_);
            }).then((_response: Response) => {
                return this.processApiCompaniesGet(_response);
            });
        }
    
        protected processApiCompaniesGet(response: Response): Promise<Company[]> {
            const status = response.status;
            let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v, k) => _headers[k] = v); };
            if (status === 200) {
                return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Company.fromJS(item));
                }
                return result200;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
                });
            }
            return Promise.resolve<Company[]>(<any>null);
        }
    
        /**
         * @sortingOptions (optional) 
         * @sortingOptions_SortExpression (optional) 
         * @return Success
         */
        apiCompaniesSortedGet(sortingOptions?: any): Promise<GridViewDataSetOfCompany> {
            let sortingOptions_SortDescending = (sortingOptions !== null && typeof sortingOptions === 'object') ? sortingOptions.SortDescending : null;
            let sortingOptions_SortExpression = (sortingOptions !== null && typeof sortingOptions === 'object') ? sortingOptions.SortExpression : null;
            let url_ = this.baseUrl + "/api/Companies/sorted?";
            if (sortingOptions_SortDescending === undefined || sortingOptions_SortDescending === null)
                throw new Error("The parameter 'sortingOptions_SortDescending' must be defined and cannot be null.");
            else
                url_ += "sortingOptions.SortDescending=" + encodeURIComponent("" + sortingOptions_SortDescending) + "&"; 
            if (sortingOptions_SortExpression !== undefined)
                url_ += "sortingOptions.SortExpression=" + encodeURIComponent("" + sortingOptions_SortExpression) + "&"; 
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                })
            };
    
            return this.transformOptions(options_).then(transformedOptions_ => {
                return this.http.fetch(url_, transformedOptions_);
            }).then((_response: Response) => {
                return this.processApiCompaniesSortedGet(_response);
            });
        }
    
        protected processApiCompaniesSortedGet(response: Response): Promise<GridViewDataSetOfCompany> {
            const status = response.status;
            let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v, k) => _headers[k] = v); };
            if (status === 200) {
                return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? GridViewDataSetOfCompany.fromJS(resultData200) : new GridViewDataSetOfCompany();
                return result200;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
                });
            }
            return Promise.resolve<GridViewDataSetOfCompany>(<any>null);
        }
    
        /**
         * @pagingOptions (optional) 
         * @return Success
         */
        apiCompaniesPagedGet(pagingOptions?: any): Promise<GridViewDataSetOfCompany> {
            let pagingOptions_PageIndex = (pagingOptions !== null && typeof pagingOptions === 'object') ? pagingOptions.PageIndex : null;
            let pagingOptions_PageSize = (pagingOptions !== null && typeof pagingOptions === 'object') ? pagingOptions.PageSize : null;
            let pagingOptions_TotalItemsCount = (pagingOptions !== null && typeof pagingOptions === 'object') ? pagingOptions.TotalItemsCount : null;
            let url_ = this.baseUrl + "/api/Companies/paged?";
            if (pagingOptions_PageIndex === undefined || pagingOptions_PageIndex === null)
                throw new Error("The parameter 'pagingOptions_PageIndex' must be defined and cannot be null.");
            else
                url_ += "pagingOptions.PageIndex=" + encodeURIComponent("" + pagingOptions_PageIndex) + "&"; 
            if (pagingOptions_PageSize === undefined || pagingOptions_PageSize === null)
                throw new Error("The parameter 'pagingOptions_PageSize' must be defined and cannot be null.");
            else
                url_ += "pagingOptions.PageSize=" + encodeURIComponent("" + pagingOptions_PageSize) + "&"; 
            if (pagingOptions_TotalItemsCount === undefined || pagingOptions_TotalItemsCount === null)
                throw new Error("The parameter 'pagingOptions_TotalItemsCount' must be defined and cannot be null.");
            else
                url_ += "pagingOptions.TotalItemsCount=" + encodeURIComponent("" + pagingOptions_TotalItemsCount) + "&"; 
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                })
            };
    
            return this.transformOptions(options_).then(transformedOptions_ => {
                return this.http.fetch(url_, transformedOptions_);
            }).then((_response: Response) => {
                return this.processApiCompaniesPagedGet(_response);
            });
        }
    
        protected processApiCompaniesPagedGet(response: Response): Promise<GridViewDataSetOfCompany> {
            const status = response.status;
            let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v, k) => _headers[k] = v); };
            if (status === 200) {
                return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? GridViewDataSetOfCompany.fromJS(resultData200) : new GridViewDataSetOfCompany();
                return result200;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
                });
            }
            return Promise.resolve<GridViewDataSetOfCompany>(<any>null);
        }
    
        /**
         * @sortingOptions (optional) 
         * @pagingOptions (optional) 
         * @sortingOptions_SortExpression (optional) 
         * @return Success
         */
        apiCompaniesSortedandpagedGet(sortingOptions?: any, pagingOptions?: any): Promise<GridViewDataSetOfCompany> {
            let sortingOptions_SortDescending = (sortingOptions !== null && typeof sortingOptions === 'object') ? sortingOptions.SortDescending : null;
            let pagingOptions_PageIndex = (pagingOptions !== null && typeof pagingOptions === 'object') ? pagingOptions.PageIndex : null;
            let pagingOptions_PageSize = (pagingOptions !== null && typeof pagingOptions === 'object') ? pagingOptions.PageSize : null;
            let pagingOptions_TotalItemsCount = (pagingOptions !== null && typeof pagingOptions === 'object') ? pagingOptions.TotalItemsCount : null;
            let sortingOptions_SortExpression = (sortingOptions !== null && typeof sortingOptions === 'object') ? sortingOptions.SortExpression : null;
            let url_ = this.baseUrl + "/api/Companies/sortedandpaged?";
            if (sortingOptions_SortDescending === undefined || sortingOptions_SortDescending === null)
                throw new Error("The parameter 'sortingOptions_SortDescending' must be defined and cannot be null.");
            else
                url_ += "sortingOptions.SortDescending=" + encodeURIComponent("" + sortingOptions_SortDescending) + "&"; 
            if (pagingOptions_PageIndex === undefined || pagingOptions_PageIndex === null)
                throw new Error("The parameter 'pagingOptions_PageIndex' must be defined and cannot be null.");
            else
                url_ += "pagingOptions.PageIndex=" + encodeURIComponent("" + pagingOptions_PageIndex) + "&"; 
            if (pagingOptions_PageSize === undefined || pagingOptions_PageSize === null)
                throw new Error("The parameter 'pagingOptions_PageSize' must be defined and cannot be null.");
            else
                url_ += "pagingOptions.PageSize=" + encodeURIComponent("" + pagingOptions_PageSize) + "&"; 
            if (pagingOptions_TotalItemsCount === undefined || pagingOptions_TotalItemsCount === null)
                throw new Error("The parameter 'pagingOptions_TotalItemsCount' must be defined and cannot be null.");
            else
                url_ += "pagingOptions.TotalItemsCount=" + encodeURIComponent("" + pagingOptions_TotalItemsCount) + "&"; 
            if (sortingOptions_SortExpression !== undefined)
                url_ += "sortingOptions.SortExpression=" + encodeURIComponent("" + sortingOptions_SortExpression) + "&"; 
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                })
            };
    
            return this.transformOptions(options_).then(transformedOptions_ => {
                return this.http.fetch(url_, transformedOptions_);
            }).then((_response: Response) => {
                return this.processApiCompaniesSortedandpagedGet(_response);
            });
        }
    
        protected processApiCompaniesSortedandpagedGet(response: Response): Promise<GridViewDataSetOfCompany> {
            const status = response.status;
            let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v, k) => _headers[k] = v); };
            if (status === 200) {
                return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? GridViewDataSetOfCompany.fromJS(resultData200) : new GridViewDataSetOfCompany();
                return result200;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
                });
            }
            return Promise.resolve<GridViewDataSetOfCompany>(<any>null);
        }
    
        /**
         * @return Success
         */
        apiOrdersGet(companyId: number, pageIndex: number, pageSize: number): Promise<Order[]> {
            let url_ = this.baseUrl + "/api/Orders?";
            if (companyId === undefined || companyId === null)
                throw new Error("The parameter 'companyId' must be defined and cannot be null.");
            else
                url_ += "companyId=" + encodeURIComponent("" + companyId) + "&"; 
            if (pageIndex === undefined || pageIndex === null)
                throw new Error("The parameter 'pageIndex' must be defined and cannot be null.");
            else
                url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
            if (pageSize === undefined || pageSize === null)
                throw new Error("The parameter 'pageSize' must be defined and cannot be null.");
            else
                url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                })
            };
    
            return this.transformOptions(options_).then(transformedOptions_ => {
                return this.http.fetch(url_, transformedOptions_);
            }).then((_response: Response) => {
                return this.processApiOrdersGet(_response);
            });
        }
    
        protected processApiOrdersGet(response: Response): Promise<Order[]> {
            const status = response.status;
            let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v, k) => _headers[k] = v); };
            if (status === 200) {
                return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Order.fromJS(item));
                }
                return result200;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
                });
            }
            return Promise.resolve<Order[]>(<any>null);
        }
    
        /**
         * @order (optional) 
         * @return Success
         */
        apiOrdersPost(order?: Order): Promise<void> {
            let url_ = this.baseUrl + "/api/Orders";
            url_ = url_.replace(/[?&]$/, "");
    
            const content_ = JSON.stringify(order);
    
            let options_ = <RequestInit>{
                body: content_,
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json", 
                })
            };
    
            return this.transformOptions(options_).then(transformedOptions_ => {
                return this.http.fetch(url_, transformedOptions_);
            }).then((_response: Response) => {
                return this.processApiOrdersPost(_response);
            });
        }
    
        protected processApiOrdersPost(response: Response): Promise<void> {
            const status = response.status;
            let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v, k) => _headers[k] = v); };
            if (status === 200) {
                return response.text().then((_responseText) => {
                return;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
                });
            }
            return Promise.resolve<void>(<any>null);
        }
    
        /**
         * @return Success
         */
        apiOrdersByOrderIdGet(orderId: number): Promise<Order> {
            let url_ = this.baseUrl + "/api/Orders/{orderId}";
            if (orderId === undefined || orderId === null)
                throw new Error("The parameter 'orderId' must be defined.");
            url_ = url_.replace("{orderId}", encodeURIComponent("" + orderId)); 
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                })
            };
    
            return this.transformOptions(options_).then(transformedOptions_ => {
                return this.http.fetch(url_, transformedOptions_);
            }).then((_response: Response) => {
                return this.processApiOrdersByOrderIdGet(_response);
            });
        }
    
        protected processApiOrdersByOrderIdGet(response: Response): Promise<Order> {
            const status = response.status;
            let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v, k) => _headers[k] = v); };
            if (status === 200) {
                return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? Order.fromJS(resultData200) : new Order();
                return result200;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
                });
            }
            return Promise.resolve<Order>(<any>null);
        }
    
        /**
         * @order (optional) 
         * @return Success
         */
        apiOrdersByOrderIdPut(orderId: number, order?: Order): Promise<void> {
            let url_ = this.baseUrl + "/api/Orders/{orderId}";
            if (orderId === undefined || orderId === null)
                throw new Error("The parameter 'orderId' must be defined.");
            url_ = url_.replace("{orderId}", encodeURIComponent("" + orderId)); 
            url_ = url_.replace(/[?&]$/, "");
    
            const content_ = JSON.stringify(order);
    
            let options_ = <RequestInit>{
                body: content_,
                method: "PUT",
                headers: new Headers({
                    "Content-Type": "application/json", 
                })
            };
    
            return this.transformOptions(options_).then(transformedOptions_ => {
                return this.http.fetch(url_, transformedOptions_);
            }).then((_response: Response) => {
                return this.processApiOrdersByOrderIdPut(_response);
            });
        }
    
        protected processApiOrdersByOrderIdPut(response: Response): Promise<void> {
            const status = response.status;
            let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v, k) => _headers[k] = v); };
            if (status === 200) {
                return response.text().then((_responseText) => {
                return;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
                });
            }
            return Promise.resolve<void>(<any>null);
        }
    
        /**
         * @return Success
         */
        apiOrdersDeleteByOrderIdDelete(orderId: number): Promise<void> {
            let url_ = this.baseUrl + "/api/Orders/delete/{orderId}";
            if (orderId === undefined || orderId === null)
                throw new Error("The parameter 'orderId' must be defined.");
            url_ = url_.replace("{orderId}", encodeURIComponent("" + orderId)); 
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json", 
                })
            };
    
            return this.transformOptions(options_).then(transformedOptions_ => {
                return this.http.fetch(url_, transformedOptions_);
            }).then((_response: Response) => {
                return this.processApiOrdersDeleteByOrderIdDelete(_response);
            });
        }
    
        protected processApiOrdersDeleteByOrderIdDelete(response: Response): Promise<void> {
            const status = response.status;
            let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v, k) => _headers[k] = v); };
            if (status === 200) {
                return response.text().then((_responseText) => {
                return;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
                });
            }
            return Promise.resolve<void>(<any>null);
        }
    }
    
    export class Company implements ICompany {
        Id?: number;
        Name?: string;
        Owner?: string;
    
        constructor(data?: ICompany) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.Id = data["Id"] !== undefined ? data["Id"] : <any>null;
                this.Name = data["Name"] !== undefined ? data["Name"] : <any>null;
                this.Owner = data["Owner"] !== undefined ? data["Owner"] : <any>null;
            }
        }
    
        static fromJS(data: any): Company {
            let result = new Company();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["Id"] = this.Id !== undefined ? this.Id : <any>null;
            data["Name"] = this.Name !== undefined ? this.Name : <any>null;
            data["Owner"] = this.Owner !== undefined ? this.Owner : <any>null;
            return data; 
        }
    }
    
    export interface ICompany {
        Id?: number;
        Name?: string;
        Owner?: string;
    }
    
    export class GridViewDataSetOfCompany implements IGridViewDataSetOfCompany {
        IsRefreshRequired?: boolean;
        Items?: Company[];
        PagingOptions?: IPagingOptions;
        RowEditOptions?: IRowEditOptions;
        SortingOptions?: ISortingOptions;
    
        constructor(data?: IGridViewDataSetOfCompany) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.IsRefreshRequired = data["IsRefreshRequired"] !== undefined ? data["IsRefreshRequired"] : <any>null;
                if (data["Items"] && data["Items"].constructor === Array) {
                    this.Items = [];
                    for (let item of data["Items"])
                        this.Items.push(Company.fromJS(item));
                }
                this.PagingOptions = data["PagingOptions"] ? IPagingOptions.fromJS(data["PagingOptions"]) : <any>null;
                this.RowEditOptions = data["RowEditOptions"] ? IRowEditOptions.fromJS(data["RowEditOptions"]) : <any>null;
                this.SortingOptions = data["SortingOptions"] ? ISortingOptions.fromJS(data["SortingOptions"]) : <any>null;
            }
        }
    
        static fromJS(data: any): GridViewDataSetOfCompany {
            let result = new GridViewDataSetOfCompany();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["IsRefreshRequired"] = this.IsRefreshRequired !== undefined ? this.IsRefreshRequired : <any>null;
            if (this.Items && this.Items.constructor === Array) {
                data["Items"] = [];
                for (let item of this.Items)
                    data["Items"].push(item.toJSON());
            }
            data["PagingOptions"] = this.PagingOptions ? this.PagingOptions.toJSON() : <any>null;
            data["RowEditOptions"] = this.RowEditOptions ? this.RowEditOptions.toJSON() : <any>null;
            data["SortingOptions"] = this.SortingOptions ? this.SortingOptions.toJSON() : <any>null;
            return data; 
        }
    }
    
    export interface IGridViewDataSetOfCompany {
        IsRefreshRequired?: boolean;
        Items?: Company[];
        PagingOptions?: IPagingOptions;
        RowEditOptions?: IRowEditOptions;
        SortingOptions?: ISortingOptions;
    }
    
    export class IPagingOptions implements IIPagingOptions {
        PageIndex?: number;
        PageSize?: number;
        TotalItemsCount?: number;
        IsFirstPage?: boolean;
        IsLastPage?: boolean;
        PagesCount?: number;
        NearPageIndexes?: number[];
    
        constructor(data?: IIPagingOptions) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.PageIndex = data["PageIndex"] !== undefined ? data["PageIndex"] : <any>null;
                this.PageSize = data["PageSize"] !== undefined ? data["PageSize"] : <any>null;
                this.TotalItemsCount = data["TotalItemsCount"] !== undefined ? data["TotalItemsCount"] : <any>null;
                this.IsFirstPage = data["IsFirstPage"] !== undefined ? data["IsFirstPage"] : <any>null;
                this.IsLastPage = data["IsLastPage"] !== undefined ? data["IsLastPage"] : <any>null;
                this.PagesCount = data["PagesCount"] !== undefined ? data["PagesCount"] : <any>null;
                if (data["NearPageIndexes"] && data["NearPageIndexes"].constructor === Array) {
                    this.NearPageIndexes = [];
                    for (let item of data["NearPageIndexes"])
                        this.NearPageIndexes.push(item);
                }
            }
        }
    
        static fromJS(data: any): IPagingOptions {
            let result = new IPagingOptions();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["PageIndex"] = this.PageIndex !== undefined ? this.PageIndex : <any>null;
            data["PageSize"] = this.PageSize !== undefined ? this.PageSize : <any>null;
            data["TotalItemsCount"] = this.TotalItemsCount !== undefined ? this.TotalItemsCount : <any>null;
            data["IsFirstPage"] = this.IsFirstPage !== undefined ? this.IsFirstPage : <any>null;
            data["IsLastPage"] = this.IsLastPage !== undefined ? this.IsLastPage : <any>null;
            data["PagesCount"] = this.PagesCount !== undefined ? this.PagesCount : <any>null;
            if (this.NearPageIndexes && this.NearPageIndexes.constructor === Array) {
                data["NearPageIndexes"] = [];
                for (let item of this.NearPageIndexes)
                    data["NearPageIndexes"].push(item);
            }
            return data; 
        }
    }
    
    export interface IIPagingOptions {
        PageIndex?: number;
        PageSize?: number;
        TotalItemsCount?: number;
        IsFirstPage?: boolean;
        IsLastPage?: boolean;
        PagesCount?: number;
        NearPageIndexes?: number[];
    }
    
    export class IRowEditOptions implements IIRowEditOptions {
        PrimaryKeyPropertyName?: string;
        EditRowId?: any;
    
        constructor(data?: IIRowEditOptions) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.PrimaryKeyPropertyName = data["PrimaryKeyPropertyName"] !== undefined ? data["PrimaryKeyPropertyName"] : <any>null;
                if (data["EditRowId"]) {
                    this.EditRowId = {};
                    for (let key in data["EditRowId"]) {
                        if (data["EditRowId"].hasOwnProperty(key))
                            this.EditRowId[key] = data["EditRowId"][key];
                    }
                }
            }
        }
    
        static fromJS(data: any): IRowEditOptions {
            let result = new IRowEditOptions();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["PrimaryKeyPropertyName"] = this.PrimaryKeyPropertyName !== undefined ? this.PrimaryKeyPropertyName : <any>null;
            if (this.EditRowId) {
                data["EditRowId"] = {};
                for (let key in this.EditRowId) {
                    if (this.EditRowId.hasOwnProperty(key))
                        data["EditRowId"][key] = this.EditRowId[key] !== undefined ? this.EditRowId[key] : <any>null;
                }
            }
            return data; 
        }
    }
    
    export interface IIRowEditOptions {
        PrimaryKeyPropertyName?: string;
        EditRowId?: any;
    }
    
    export class ISortingOptions implements IISortingOptions {
        SortDescending?: boolean;
        SortExpression?: string;
    
        constructor(data?: IISortingOptions) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.SortDescending = data["SortDescending"] !== undefined ? data["SortDescending"] : <any>null;
                this.SortExpression = data["SortExpression"] !== undefined ? data["SortExpression"] : <any>null;
            }
        }
    
        static fromJS(data: any): ISortingOptions {
            let result = new ISortingOptions();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["SortDescending"] = this.SortDescending !== undefined ? this.SortDescending : <any>null;
            data["SortExpression"] = this.SortExpression !== undefined ? this.SortExpression : <any>null;
            return data; 
        }
    }
    
    export interface IISortingOptions {
        SortDescending?: boolean;
        SortExpression?: string;
    }
    
    export class Order implements IOrder {
        Id?: number;
        Number?: string;
        Date?: Date;
        CompanyId?: number;
        OrderItems?: OrderItem[];
    
        constructor(data?: IOrder) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.Id = data["Id"] !== undefined ? data["Id"] : <any>null;
                this.Number = data["Number"] !== undefined ? data["Number"] : <any>null;
                this.Date = data["Date"] ? new Date(data["Date"].toString()) : <any>null;
                this.CompanyId = data["CompanyId"] !== undefined ? data["CompanyId"] : <any>null;
                if (data["OrderItems"] && data["OrderItems"].constructor === Array) {
                    this.OrderItems = [];
                    for (let item of data["OrderItems"])
                        this.OrderItems.push(OrderItem.fromJS(item));
                }
            }
        }
    
        static fromJS(data: any): Order {
            let result = new Order();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["Id"] = this.Id !== undefined ? this.Id : <any>null;
            data["Number"] = this.Number !== undefined ? this.Number : <any>null;
            data["Date"] = this.Date ? this.Date.toISOString() : <any>null;
            data["CompanyId"] = this.CompanyId !== undefined ? this.CompanyId : <any>null;
            if (this.OrderItems && this.OrderItems.constructor === Array) {
                data["OrderItems"] = [];
                for (let item of this.OrderItems)
                    data["OrderItems"].push(item.toJSON());
            }
            return data; 
        }
    }
    
    export interface IOrder {
        Id?: number;
        Number?: string;
        Date?: Date;
        CompanyId?: number;
        OrderItems?: OrderItem[];
    }
    
    export class OrderItem implements IOrderItem {
        Id?: number;
        Text?: string;
        Amount?: number;
        Discount?: number;
        IsOnStock?: boolean;
    
        constructor(data?: IOrderItem) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.Id = data["Id"] !== undefined ? data["Id"] : <any>null;
                this.Text = data["Text"] !== undefined ? data["Text"] : <any>null;
                this.Amount = data["Amount"] !== undefined ? data["Amount"] : <any>null;
                this.Discount = data["Discount"] !== undefined ? data["Discount"] : <any>null;
                this.IsOnStock = data["IsOnStock"] !== undefined ? data["IsOnStock"] : <any>null;
            }
        }
    
        static fromJS(data: any): OrderItem {
            let result = new OrderItem();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["Id"] = this.Id !== undefined ? this.Id : <any>null;
            data["Text"] = this.Text !== undefined ? this.Text : <any>null;
            data["Amount"] = this.Amount !== undefined ? this.Amount : <any>null;
            data["Discount"] = this.Discount !== undefined ? this.Discount : <any>null;
            data["IsOnStock"] = this.IsOnStock !== undefined ? this.IsOnStock : <any>null;
            return data; 
        }
    }
    
    export interface IOrderItem {
        Id?: number;
        Text?: string;
        Amount?: number;
        Discount?: number;
        IsOnStock?: boolean;
    }
    
    export class SwaggerException extends Error {
        message: string;
        status: number; 
        response: string; 
        headers: { [key: string]: any; };
        result: any; 
    
        constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
            super();
    
            this.message = message;
            this.status = status;
            this.response = response;
            this.headers = headers;
            this.result = result;
        }
    
        protected isSwaggerException = true;
    
        static isSwaggerException(obj: any): obj is SwaggerException {
            return obj.isSwaggerException === true;
        }
    }
    
    function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
        if(result !== null && result !== undefined)
            throw result;
        else
            throw new SwaggerException(message, status, response, headers, null);
    }
}
