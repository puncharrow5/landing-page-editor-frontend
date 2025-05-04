import { gql } from "@apollo/client";

export const UPDATE_PROFILE_IMAGE = gql`
  mutation UpdateProfileImage($file: Upload) {
    updateProfileImage(file: $file)
  }
`;
