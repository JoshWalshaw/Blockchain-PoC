import {Block} from "./Block";

export class BlockChain {

    public static readonly Difficulty = 6;

    /* Start our BlockChain with our Genesis Block */
    private readonly Chain: Array<Block>;

    constructor() {
        this.Chain = [Block.createGenesisBlock()];
    }

    /* Get the latest block within our chain */
    public getLatestBlock(): Block {
        return this.Chain[this.Chain.length - 1]
    }

    public addBlockToChain(newBlock: Block): void {

        /* Update the current block with the previous block's hash */
        newBlock.setPreviousHash(this.getLatestBlock().getCurrentHash());

        newBlock.mineBlock(BlockChain.Difficulty)

        /* Add our newly created block to the chain */
        this.Chain.push(newBlock);
    }

    /* Checks to see if our current chain is valid and hasn't been tempered with */
    public isBlockChainValid(): boolean {

        /* Loop through our blocks, ignoring the genesis block (the first block in our chain) */
        for (let i = 1; i < this.getChain().length; i++) {
            const previousBlock: Block = this.getBlockByIndex(i - 1);
            const currentBlock: Block = this.getBlockByIndex(i);

            /* Validate our previous hash by generating the hash based on our current data in the object */
            if (currentBlock.getCurrentHash() !== currentBlock.createCurrentHash())
                return false;
            /* Does our current blocks previous hash match the previous blocks actual hash */
            if (currentBlock.getPreviousHash() !== previousBlock.getCurrentHash())
                return false;
        }

        /* The above didn't return false so we must be valid */
        return true
    }

    public getChain(): Array<Block> {
        return this.Chain;
    }

    public getBlockByIndex(index: number): Block {
        return this.getChain()[index];
    }
}