import algoliasearch from "algoliasearch";
import {
  FetchCategoryProductsArgs,
  FilteredSearchArgs,
  KeywordSearchArgs,
} from "lib/types/algolia";
import {
  ALGOLIA_API_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_INDEX,
} from "../../general-config";

const ALGOLIA_CLIENT = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const INDEX = ALGOLIA_CLIENT.initIndex(ALGOLIA_SEARCH_INDEX);

export const fetchCategoryProducts = async ({
  categoryName,
  pageSize = 500,
  page = 0,
  filterParents = false,
}: FetchCategoryProductsArgs) => {
  try {
    let response = await INDEX.search(categoryName, {
      restrictSearchableAttributes: ["Category"],
      hitsPerPage: pageSize,
      facetFilters: filterParents ? [["isVariant:false"]] : [],
      page,
    });
    return response;
  } catch (err) {
    console.log("ALGOLIA SEARCH INDEX ERROR ->", err);
    return null;
  }
};

export const performFilteredSearch = async ({
  query = "",
  pageSize = 500,
  page = 0,
  filters,
}: FilteredSearchArgs) => {
  try {
    return new Promise((resolve, reject) => {
      INDEX.search(query, {
        hitsPerPage: pageSize,
        facetFilters: filters,
        page,
      })
        .then(({ hits }) => {
          return resolve(hits);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } catch (err) {
    console.log(`Error fetching items for query: ${query}`, err);
    return null;
  }
};

export const performMultiFilteredSearch = async ({
  categoryArray,
  filters,
}: FilteredSearchArgs) => {
  const queryArray: any[] = [];

  categoryArray &&
    categoryArray.length > 0 &&
    categoryArray.forEach((query) => {
      const obj = {
        indexName: ALGOLIA_SEARCH_INDEX,
        query: query,
        params: {
          facetFilters: filters,
        },
      };
      queryArray.push(obj);
    });

  try {
    return new Promise((resolve, reject) => {
      ALGOLIA_CLIENT.multipleQueries(queryArray.sort(() => Math.random() - 0.5))
        .then(({ results }) => {
          return resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } catch (err) {
    // console.log(`Error fetching items for query: ${query}`, err);
    return null;
  }
};

export const performKeywordSearch = async ({
  query,
  pageSize = 500,
  page = 0,
  filterParents = false,
  facetFilters = [],
}: KeywordSearchArgs) => {
  try {
    let response = await INDEX.search(query, {
      // restrictSearchableAttributes: ['title', 'description'],
      hitsPerPage: pageSize,
      facetFilters: [facetFilters],
      page,
    });
    return response;
  } catch (err) {
    console.log(`Error fetching items for query: ${query}`, err);
    return null;
  }
};
