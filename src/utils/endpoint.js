import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import startsWith from "lodash/startsWith";
import trimStart from "lodash/trimStart";

export function endpointWithParams(endpoint, params = {}) {
  const endpointParts = endpoint.split("/");

  const replacedEndpointParts = endpointParts.map(part => {
    if (!startsWith(part, ":")) {
      return part;
    } else {
      const partWithoutIdentifier = trimStart(part, ":");
      if (params.hasOwnProperty(partWithoutIdentifier)) {
        const foundParam = params[partWithoutIdentifier];
        if (isNumber(foundParam) || isString(foundParam)) {
          return foundParam;
        } else {
          throw new Error(
            `params have to be either number or string. type of ${partWithoutIdentifier} is ${typeof partWithoutIdentifier}`
          );
        }
      } else {
        throw new Error(`params argument served to endpointWithParams is incomplete.
                every part in url starting with : has to be defined in params (missing: ${partWithoutIdentifier}).`);
      }
    }
  });

  return replacedEndpointParts.join("/");
}
