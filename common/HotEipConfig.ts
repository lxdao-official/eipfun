interface ItemConfigType {
  name: string;
  key: string;
  description: string;
}
export const hotEips: ItemConfigType[] = [
  {
    name: 'EIP 4337',
    key: '4337',
    description: 'Account Abstraction Using Alt Mempool',
  },
  {
    name: 'EIP 6551',
    key: '6551',
    description: 'Non-fungible Token Bound Accounts',
  },
];
export const newEips: ItemConfigType[] = [
  {
    name: 'ERC 6909',
    key: '6909',
    description: 'Minimal Multi-Token Interface',
  },
  {
    name: 'EIP 7329',
    key: '7329',
    description: 'ERC/EIP Repository split',
  },
];
