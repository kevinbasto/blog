export interface Novel {
    id : number;
    title : string;
    description: string;
    cover: string;
    url : string;
    finished: boolean;
    translators : Array<string>;
    chapters : number;
}
