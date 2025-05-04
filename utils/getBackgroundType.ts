import { BackgroundType } from "@/graphql/generated/types";

export const getBackgroundType = (backgroundType: BackgroundType | undefined) => {
  if (backgroundType === BackgroundType.Color) {
    return "색상";
  } else if (backgroundType === BackgroundType.Image) {
    return "이미지";
  }
  return undefined;
};
