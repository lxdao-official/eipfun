## Summary

ERC-67 is a proposal that defines a format for encoding transactions into a URI, including a recipient, number of ethers (possibly zero), and optional bytecode. The motivation behind this proposal is to simplify the process of setting up transactions with a recipient, associated ethers, and optional bytecode, without requiring any fuss from the end user. Currently, implementations for this are inconsistent, and there isn't any standard way for stores that want payment in ether to put specific metadata about price on the call. The proposal goes beyond address and also includes optional bytecode and value. If properly implemented in all wallets, this should make execution of contracts directly from wallets much simpler. The proposal tries to keep backward compatibility and not break existing things, and there are no known security considerations at this time.

## Videos

- [Example Video Title](https://www.youtube.com/watch?v=TDGq4aeevgY)

## Projects

- [Example Project Name](https://xxxx.xxx/xxxxx) Project Description (one sentence) ![this is an img's alt for the project logo](https://xxxx.xxx/project-logo.xxx)

## Further Reading

- [Example Article Title](https://xxxx.xxx/xxxxx) ![this is an img's alt for the article cover](https://xxxx.xxx/article-cover.xxx)
