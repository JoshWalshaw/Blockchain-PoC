import {BlockChain} from "./Engine/BlockChain"
import {Block} from "./Engine/Block";
import {Transaction} from "./Engine/Transaction";

const MessageChain = new BlockChain();

MessageChain.addBlockToChain(
    new Block(
        1,
        new Date() / 1000 | 0,
        new Transaction(1, new Date() / 1000 | 0, "Hey Charlie, how's things going?", 10, 12)
    )
);

MessageChain.addBlockToChain(
    new Block(
        2,
        new Date() / 1000 | 0,
        new Transaction(1, new Date() / 1000 | 0, "Sup Josh, not too bad - how about you?", 12, 10)
    )
);

console.log("Current BlockChain: ", JSON.stringify(MessageChain, null, 4))

console.log("Is BlockChain Valid Pre-Modification: ", MessageChain.isBlockChainValid());

MessageChain.getBlockByIndex(2).setData(new Transaction());

console.log("Is BlockChain Valid Post-Modification:: ", MessageChain.isBlockChainValid());
