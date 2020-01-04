import * as Crypto from "crypto-js"
import {Transaction} from "./Transaction";

export class Block {

    private Index: number;
    private Timestamp: number;
    private Data: Transaction;
    private CurrentHash: string;
    private PreviousHash: string | undefined;
    private NonceValue: number = 0;

    constructor(index: number, timestamp: number, data: Transaction, previousHash?: string) {
        this.Index = index;
        this.Timestamp = timestamp;
        this.Data = data;
        this.CurrentHash = this.createCurrentHash();

        if (previousHash != null)
            this.PreviousHash = previousHash;
    }

    /* Used to create our 'genesis' or initial block within the chain */
    public static createGenesisBlock(): Block {
        return new Block(0, (new Date() / 1000 | 0), new Transaction(), "-1")
    }

    /* Create our hash based on the data within this object */
    public createCurrentHash(): string {
        return Crypto.SHA256(
            this.getIndex() +
            this.getTimestamp() +
            JSON.stringify(this.getData()) +
            this.getPreviousHash() +
            this.getNonceValue()
        ).toString()
    }

    /*
     * In BlockChain there's a concept called "Proof of Work" where you provide
     * the machine a task to solve in order to prevent different types of attacks such as DoS & Spam.
     * The solution needs to be easily checked. Otherwise, not all nodes are capable of analyzing if the calculations are correct.
     * Then you will have to trust other nodes and it violates one of the most important features of Blockchain - transparency.
     *
     * In our case we're telling the system that in order to create a new block of information - the computer must
     * generate a hash that starts with a varying amount of 0's depending on the param passed to the method.
     */
    public mineBlock(difficulty: number): void {
        while (this.getCurrentHash().substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.increaseNonceValue();
            this.setCurrentHash(this.createCurrentHash())
        }
        console.log(`Block successfully generated: ${this.getCurrentHash()}`)
    }

    public getIndex(): number {
        return this.Index;
    }

    public setIndex(value: number): void {
        this.Index = value;
    }

    public getTimestamp(): number {
        return this.Timestamp;
    }

    public setTimestamp(value: number): void {
        this.Timestamp = value;
    }

    public getData(): any {
        return this.Data
    }

    public setData(value: Transaction): void {
        this.Data = value;
    }

    public getCurrentHash(): string {
        return this.CurrentHash;
    }

    public setCurrentHash(value: string): void {
        this.CurrentHash = value;
    }

    public getPreviousHash(): string {
        return this.PreviousHash;
    }

    public setPreviousHash(value: string): void {
        this.PreviousHash = value;
    }

    public getNonceValue(): number {
        return this.NonceValue;
    }

    public setNonceValue(value: number): void {
        this.NonceValue = value;
    }

    public increaseNonceValue(): void {
        this.NonceValue++;
    }

}