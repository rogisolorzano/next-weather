/**
 * Simulate responses from Google Places API which have some interesting
 * characters before the response JSON, like: _xdc_._ya50se && _xdc_._ya50se({})
 */
export const wrapPlacesResponse = (request, mockData) => {
  const searchParams = new URLSearchParams(request.url);
  const callbackParam = searchParams.get("callback");
  request.reply(
    `${callbackParam} && ${callbackParam}(${JSON.stringify(mockData)})`,
  );
};
