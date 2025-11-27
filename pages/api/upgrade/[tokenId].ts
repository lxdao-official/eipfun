import type { NextApiRequest, NextApiResponse } from 'next';

type Metadata = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
};

function parseTokenId(raw: string | string[] | undefined): number | null {
  if (!raw) return null;
  const val = Array.isArray(raw) ? raw[0] : raw;
  const normalized = val.replace(/\.json$/i, '');
  const num = Number(normalized);
  return Number.isInteger(num) && num > 0 ? num : null;
}

function getMetadata(tokenId: number): Metadata | null {
  // Map tokenId -> upgrade metadata. Currently only tokenId=1 (Fusaka).
  if (tokenId === 1) {
    return {
      name: 'Memory of Ethereum - Fusaka',
      description:
        'A commemorative ERC-1155 collectible celebrating the Fusaka upgrade on Ethereum. Each Memory honors the network’s evolution and unlocks future community perks.',
      image: 'https://cdn.ethpanda.org/eipfun-upgrade/fusaka.png',
      external_url: 'https://eip.fun/fusaka',
      attributes: [
        { trait_type: 'Upgrade', value: 'Fusaka' },
        { trait_type: 'Collection', value: 'Memory of Ethereum' },
      ],
    };
  }
  return null;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tokenId = parseTokenId(req.query.tokenId);
  if (!tokenId) {
    return res.status(404).json({ error: 'Invalid token id' });
  }

  const metadata = getMetadata(tokenId);
  if (!metadata) {
    return res.status(404).json({ error: 'Token metadata not found' });
  }

  return res.status(200).json(metadata);
}
