export interface ICollection {
    name: string;
    books: any[]
}

export class Collection implements ICollection{
    name: string;
    books: any[] = [];

    constructor(){}
}