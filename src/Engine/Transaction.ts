export class Transaction {

    private Id: number = -1;
    private Timestamp: number = new Date() / 1000 | 0;
    private Message: string = "";
    private Sender: number = -1;
    private Recipient: number = -1;

    constructor(id?: number, timestamp?: number, message?: string, sender?: number, recipient?: number) {
        this.Id = id;
        this.Timestamp = timestamp;
        this.Message = message;
        this.Sender = sender;
        this.Recipient = recipient;
    }

    public getId(): number {
        return this.Id;
    }

    public setId(value: number): void {
        this.Id = value;
    }

    public getTimestamp(): number {
        return this.Timestamp;
    }

    public setTimestamp(value: number): void {
        this.Timestamp = value;
    }

    public getMessage(): string {
        return this.Message;
    }

    public setMessage(value: string): void {
        this.Message = value;
    }

    public getSender(): number {
        return this.Sender;
    }

    public setSender(value: number): void {
        this.Sender = value;
    }

    public getRecipient(): number {
        return this.Recipient;
    }

    public setRecipient(value: number): void {
        this.Recipient = value;
    }
}