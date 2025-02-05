import { create } from "zustand";

interface Appname {
  label: string;
}
interface AppUrl {
  url: string;
}
interface CurrentDisables {
  disables: string[];
  upadteDisables: ({ disables }: { disables: string[] }) => void;
}
interface AdditionalsViewRouting {
  visiblity: boolean;
  routing: boolean;
  dependencies: string[];
}
interface Additionals {
  forgetPassword: Partial<AdditionalsViewRouting>;
  resetPassword: Partial<AdditionalsViewRouting>;
  rememberMe: Partial<AdditionalsViewRouting>;
}
interface SocialProviders {
  [key: string]: boolean;
  google: boolean;
  facebook: boolean;
  discord: boolean;
  apple: boolean;
  twitter: boolean;
  twitch: boolean;
  github: boolean;
  microsoft: boolean;
  gitlab: boolean;
  dropbox: boolean;
  linkedin: boolean;
  spotify: boolean;
}
interface Credentials {
  enabled: boolean;
  email: boolean;
  username: boolean;
  phoneNumber: boolean;
}
interface Env {
  better_auth_secret: boolean;
}
interface OtherSignIn {
  passKey: boolean;
  magicLink: boolean;
}
export interface EnabledComponent {
  credentials: Partial<Credentials>;
  additionals: Partial<Additionals>;
  socials: Partial<SocialProviders>;
  otherSignIn: Partial<OtherSignIn>;
  env?: Partial<Env>;
}
interface ComponentStore {
  enabledComp: EnabledComponent;
  updateEnabledComponent: ({
    toogledComp,
  }: {
    toogledComp: Partial<EnabledComponent>;
  }) => void;
  reset: () => void;
}
interface AppUrl {
  url: string;
  updateUrl: ({ url }: { url: string }) => void;
}
const initialState = {
  credentials: {
    enabled: true,
    email: true,
    username: false,
    phoneNumber: false,
  },
  additionals: {
    forgetPassword: {
      visiblity: false,
      routing: false,
      dependencies: ["email"],
    },
    resetPassword: {
      visiblity: false,
      routing: false,
      dependencies: ["email"],
    },
    rememberMe: {
      visiblity: false,
      routing: false,
      dependencies: ["email"],
    },
  },
  socials: {
    google: true,
    facebook: false,
    discord: false,
    apple: false,
    twitter: false,
    twitch: false,
    github: false,
    microsoft: false,
    gitlab: false,
    dropbox: false,
    linkedin: false,
    spotify: false,
  },
  otherSignIn: {
    passKey: false,
    magicLink: false,
  },
  env: {
    better_auth_secret: true,
  },
};
export const useComponents = create<ComponentStore>((set) => ({
  enabledComp: initialState,
  updateEnabledComponent: ({ toogledComp }) =>
    set((state) => ({
      enabledComp: {
        ...state.enabledComp,
        ...toogledComp,
      },
    })),
  reset: () =>
    set({
      enabledComp: initialState,
    }),
}));
export const useUrl = create<AppUrl>((set) => ({
  url: "http://localhost:3000",
  updateUrl: ({ url }) => set({ url }),
}));

export const useCurrentDisable = create<CurrentDisables>((set) => ({
  disables: [""],
  upadteDisables: ({ disables }) => set({ disables }),
}));
