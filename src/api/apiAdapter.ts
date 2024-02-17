import {MetaDataPage, Page} from '@types';

import {MetaDataPageAPI, PageAPI} from './apiTypes';

function toMetaDataPage(meta: MetaDataPageAPI): MetaDataPage {
  return {
    total: meta.total,
    perPage: meta.per_page,
    currentPage: meta.current_page,
    lastPage: meta.last_page,
    firstPage: meta.first_page,
    hasNextPage: !!meta.next_page_url,
    hasPreviousPage: !!meta.previous_page_url,
  };
}

function toPageModel<ApiType, ModelType>(
  page: PageAPI<ApiType>,
  adapter: (data: ApiType) => ModelType,
): Page<ModelType> {
  return {
    data: page.data.map(adapter),
    meta: toMetaDataPage(page.meta),
  };
}

export const apiAdapter = {
  toMetaDataPage,
  toPageModel,
};
