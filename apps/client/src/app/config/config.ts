export const config = {
  algolia: {
    appId: process.env.NX_ALGOLIA_APP_ID as string,
    apiKey: process.env.NX_ALGOLIA_SEARCH_API_KEY as string,
    moviesIndex: process.env.NX_ALGOLIA_MOVIES_INDEX_NAME as string,
  },
};


//  The config object is defined using const, 
//  indicating that it is a constant and its value cannot be reassigned

// The config object is exported using the export keyword, making it accessible for other modules to import and use.

