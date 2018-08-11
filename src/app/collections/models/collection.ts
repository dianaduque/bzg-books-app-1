export interface ICollection {
    name: string;
    description: string;
    books: any[]
}

export class Collection implements ICollection{
    name: string;
    description: string;
    books: any[] = [];

    constructor(){}
}