import { useMemo } from "react";

const useSplitData = (data, config) => {
  const { photos, otherData } = useMemo(() => {
    const photos = {};
    const otherData = {};

    config.forEach(({ key, type }) => {
      if (type === "photo") {
        photos[key] = data[key];
      } else {
        otherData[key] = data[key];
      }
    });

    return { photos, otherData };
  }, [data, config]);

  return { photos, otherData };
};

export default useSplitData;
