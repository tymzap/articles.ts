import {Article} from 'interfaces/article';

export const resolveCategoryEndpoint = (
  category: Article['category']
): 'fashion' | 'sports' =>
  category === 'fashion' ? 'fashion' : 'sports';
