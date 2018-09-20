
export class TodoItem {
    id: string;
    content: string;
    date: Date;
    completed: boolean;
    constructor(content: string, date: Date = new Date(), completed: boolean = false) {

        this.id = ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
        this.content = content;
        this.date = date;
        this.completed = completed;
    }
}