interface ItemConfigType {
  name: string;
  key: string;
  description: string;
}
export const hotEips: ItemConfigType[] = [
  {
    name: 'EIP 721',
    key: '721',
    description: 'Non-Fungible Token Standard',
  },
  {
    name: 'EIP 6551',
    key: '6551',
    description: 'Non-fungible Token Bound Accounts',
  },
];
export const newEips: ItemConfigType[] = [
  {
    name: 'EIP 20',
    key: '20',
    description: 'Token Standard',
  },
  {
    name: 'EIP 7329',
    key: '7329',
    description: 'ERC/EIP Repository split',
  },
];
