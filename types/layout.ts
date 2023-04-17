import { EipType } from './eips';

export interface MetaProps
  extends Pick<EipType, 'created' | 'description'  | 'title'> {
  /**
   * For the meta tag `og:type`
   */
  type?: string;
}