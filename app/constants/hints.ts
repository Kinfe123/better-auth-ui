interface HintText {
  credential: {
    [key: string]: string;
  };
  magicLink: {
    [key: string]: string;
  };
}
export const hintsText = {
  credential: {
    magicLink: "Please turn off magic link to enable credential",
  },
  magicLink: {
    credential: "Please turn off credential to enable magic link.",
  },
};
