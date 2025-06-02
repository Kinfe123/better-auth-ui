interface HintText {
  credent :q::tial: {
    [key: string]: string;
  };
  magicLink: {
    [key: string]: string;
  };
}
export const hintsText: HintText = {
  credential: {
    magicLink: "Please turn off magic link to enable credential.",
  },
  magicLink: {
    credential: "Please turn off credential to enable magic link.",
  },
};
export const hintTextWithString: Record<string, any> = {
  yetGroup: {
    phoneNumber: "Phone number will be updated soon.",
    username: "Username will be updated soon.",
  },
};
