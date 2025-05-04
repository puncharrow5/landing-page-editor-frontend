import { ComponentType } from "@/graphql/generated/types";

export const getComponentType = (componentType: ComponentType) => {
  switch (componentType) {
    case ComponentType.Section:
      return "일반 섹션";
    case ComponentType.Inquiry:
      return "문의 섹션";
  }
};
