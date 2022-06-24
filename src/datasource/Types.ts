export interface GetAllVO {
  articleId: number;
  articleTitle: string;
  articleAuthor: string;
  articleType: number;
  articleCategory: number;
  articleDraft: number;
  articleCreateTime: string;
  articleModifyTime: string;
}

export interface GetCategoryByAssociatedTypeVO {
  categoryId: number;
  categoryName: string;
}