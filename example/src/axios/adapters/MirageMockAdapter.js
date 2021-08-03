/**
 * `mirage` mock adapter for `axios`
 * @param {import('axios').AxiosAdapter} adapter
 * @returns
 */
export function MirageMockAdapter(adapter) {
  return async function (config) {
    const { NODE_ENV, VUE_APP_MIRAGE_ENABLE } = process.env;

    const isDevelopment = NODE_ENV === "development";
    const isMockEnabled = VUE_APP_MIRAGE_ENABLE === "true";

    if (isDevelopment && isMockEnabled) {
      await MirageMockServer.start();
    }

    return adapter(config);
  };
}
