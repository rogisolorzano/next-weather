export const authResponse = [1, null, 0, null, null, [1]];

export const autocompleteResponse = {
  predictions: [
    {
      description: "Olathe, KS, USA",
      matched_substrings: [{ length: 6, offset: 0 }],
      place_id: "ChIJQU8fEKWXwIcRsH1-nVY4gsE",
      reference: "ChIJQU8fEKWXwIcRsH1-nVY4gsE",
      structured_formatting: {
        main_text: "Olathe",
        main_text_matched_substrings: [{ length: 6, offset: 0 }],
        secondary_text: "KS, USA",
      },
      terms: [
        { offset: 0, value: "Olathe" },
        { offset: 8, value: "KS" },
        { offset: 12, value: "USA" },
      ],
      types: ["locality", "political", "geocode"],
    },
    {
      description: "Olathe, CO, USA",
      matched_substrings: [{ length: 6, offset: 0 }],
      place_id: "ChIJs83feHWrOIcR33c2B4M44TA",
      reference: "ChIJs83feHWrOIcR33c2B4M44TA",
      structured_formatting: {
        main_text: "Olathe",
        main_text_matched_substrings: [{ length: 6, offset: 0 }],
        secondary_text: "CO, USA",
      },
      terms: [
        { offset: 0, value: "Olathe" },
        { offset: 8, value: "CO" },
        { offset: 12, value: "USA" },
      ],
      types: ["locality", "political", "geocode"],
    },
  ],
  status: "OK",
};

export const geocodeResponse = {
  results: [
    {
      address_components: [
        {
          long_name: "Olathe",
          short_name: "Olathe",
          types: ["locality", "political"],
        },
        {
          long_name: "Johnson County",
          short_name: "Johnson County",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Kansas",
          short_name: "KS",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "United States",
          short_name: "US",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Olathe, KS, USA",
      geometry: {
        bounds: {
          northeast: {
            lat: 38.987756,
            lng: -94.7140479,
          },
          southwest: {
            lat: 38.8054929,
            lng: -94.928023,
          },
        },
        location: {
          lat: 38.8813958,
          lng: -94.81912849999999,
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 38.987756,
            lng: -94.7140479,
          },
          southwest: {
            lat: 38.8054929,
            lng: -94.928023,
          },
        },
      },
      place_id: "ChIJQU8fEKWXwIcRsH1-nVY4gsE",
      types: ["locality", "political"],
    },
  ],
  status: "OK",
};
