const algoliasearch = require("algoliasearch");

const { ALGOLIA_APP_ID, SEARCH_API_KEY } = process.env;

const client = algoliasearch("ANSPXEHTMP", "a2b1188f881859b900519955e86ab911");

export const postsIndex = client.initIndex("dev_POSTS");

postsIndex.setSettings({
  ranking: [
    "asc(title)",
    "asc(tags)",
    "asc(description)",
    "asc(lookingFor)",
    "asc(website)",
  ],
  customRanking: [
    "desc(createdAt)",
    "asc(title)",
    "asc(tags)",
    "asc(description)",
    "asc(lookingFor)",
    "asc(website)",
  ],
});

export const schoolsIndex = client.initIndex("dev_SCHOOLS");

schoolsIndex.setSettings({});

export const usersIndex = client.initIndex("users");

usersIndex.setSettings({
  attributesToIndex: ["firstName", "lastName", "username"],
});

export const tagsIndex = client.initIndex("tags");
