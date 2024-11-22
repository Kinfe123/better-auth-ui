import {
  ArrowLeft,
  Layout,
  PhoneCall,
  Users2,
  Code2,
  Mail,
  TwitchIcon,
  LucideTwitch,
  Lock,
  Calendar,
  Key,
} from "lucide-react";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { Icons } from "@/components/icons";
export const authOptions = {
  credential: {
    email: {
      name: "Email",
      checked: false,
      icon: <Mail className="w-4 h-4" />,
    },
    phoneNumber: {
      name: "Phone Number",
      checked: false,
      icon: <PhoneCall className="w-4 h-4" />,
    },
    username: {
      name: "Username",
      checked: false,
      icon: <Users2 className="w-4 h-4" />,
    },
  },
  socialProviders: {
    google: {
      name: "Google",
      checked: false,
      icon: <Icons.google />,
    },
    facebook: {
      name: "Facebook",
      checked: false,
      icon: (
        <svg
          className="w-4 h-4 text-[#1877F2]"
          fill="#fff"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
        </svg>
      ),
    },
    apple: {
      name: "Apple",
      checked: false,
      icon: (
        <svg
          fill="#fff"
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 22.773 22.773"
        >
          <g>
            <g>
              <path
                d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573
			c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
              />
              <path
                d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334
			c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0
			c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019
			c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464
			c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648
			c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"
              />
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </g>
        </svg>
      ),
    },
    microsoft: {
      name: "Microsoft",
      checked: false,
      icon: <Icons.microsft />,
    },
    discord: {
      name: "Discord",
      checked: false,
      icon: <DiscordLogoIcon />,
    },
    twitter: {
      name: "Twiiter",
      checked: false,
      icon: <TwitterLogoIcon />,
    },
    twitch: {
      name: "Twitch",
      checked: false,
      icon: <LucideTwitch className="w-4 h-4" />,
    },
    github: {
      name: "Github",
      chceked: false,
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            fill="#fff"
            fillRule="evenodd"
          />
        </svg>
      ),
    },
  },
  additionals: {
    forgetPassword: {
      name: "Forget Password",
      checked: false,
      icon: <Lock className="w-4 h-4" />,
    },
    rememberMe: {
      name: "Remeber Me",
      checked: false,
      icon: <Calendar className="w-4 h-4" />,
    },
  },
  otherSignIn: {
    passKey: {
      name: "Passkey",
      checked: false,
      icon: <Key className="w-4 h-4" />,
    },
  },
};
