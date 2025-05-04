import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: ["http://localhost:3000/graphql"],
  documents: [
    "./graphql/fragments/**/*.ts",
    "./graphql/query/**/*.ts",
    "./graphql/mutation/**/*.ts",
    "./graphql/subscription/**/*.ts",
    "./**/*/gql.ts",
    "./**/*/*.gql.ts",
    "!./**/*.graphql.ts",
  ],
  generates: {
    "./graphql/generated/types.ts": {
      hooks: {
        afterOneFileWrite: ["prettier --write"],
      },
      config: {
        skipTypename: true,
      },
      plugins: [
        "typescript",
        "typescript-operations",
        {
          "typescript-react-apollo": {
            withHOC: false,
            withComponent: false,
            withHooks: true,
          },
        },
      ],
    },
  },
};

export default config;
