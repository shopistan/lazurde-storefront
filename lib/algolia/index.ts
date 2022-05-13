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
  page = 0,
  filterParents = false,
}: FetchCategoryProductsArgs) => {
  try {
    let response = await INDEX.search(categoryName, {
      restrictSearchableAttributes: ["Category"],
      //hitsPerPage: 20,
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
  filters,
}: FilteredSearchArgs) => {
  try {
    return new Promise((resolve, reject) => {
      INDEX.search(query, {
        facetFilters: filters,
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
