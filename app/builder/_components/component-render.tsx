import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs } from "./tab";
import SignIn from "./signin";
import { SignUp } from "./signup.";
import { TopBar } from "./nested/topbar";
import { useComponents, useUrl } from "@/lib/store";
import ForgetPaswordDemo from "./nested/pages/forget-password";
import ResetPasswordDemo from "./nested/pages/reset-password";
export function ComponentRender() {
  const { url, updateUrl } = useUrl();
  const { enabledComp } = useComponents();

  let comp = <SignInUp />;
  switch (url) {
    case "http://localhost:3000/forget-password":
      comp = <ForgetPaswordDemo />;
      break;

    case "http://localhost:3000/reset-password":
      comp = <ResetPasswordDemo />;
      break;
    default:
      break;
  }
  useEffect(() => {}, [enabledComp]);
  return (
    <div className="relative h-full w-[60%]">
      <TopBar />
      <div className="h-full">{comp}</div>
    </div>
  );
}

const SignInUp = () => {
  return (
    <div className="flex pt-20 items-center flex-col justify-center w-full md:pb-10">
      <div className="md:w-[400px] ">
        <Tabs
          tabs={[
            {
              title: "Sign In",
              value: "sign-in",
              content: <SignIn />,
            },
            {
              title: "Sign Up",
              value: "sign-up",
              content: <SignUp />,
            },
          ]}
        />
      </div>
    </div>
  );
};
// export const ComponentRender = () => {
//   return (
//     <div className="flex items-start justify-center">
//       <Card className="w-full max-w-sm p-6 space-y-6">
//         <div className="space-y-2 text-center">
//           <h2 className="text-2xl font-semibold">Sign into My Application</h2>
//           <p className="text-sm text-muted-foreground">
//             Welcome back! Please sign in to continue
//           </p>
//         </div>

//         <Button className="w-full" variant="outline">
//           <svg
//             className="w-5 h-5 mr-2"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               fill="#4285F4"
//             />
//             <path
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               fill="#34A853"
//             />
//             <path
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               fill="#FBBC05"
//             />
//             <path
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               fill="#EA4335"
//             />
//           </svg>
//           Continue with Google
//         </Button>

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-background px-2 text-muted-foreground">or</span>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="email">Email address</Label>
//           <Input id="email" placeholder="m@example.com" type="email" />
//         </div>

//         <Button className="w-full">Continue</Button>

//         <div className="text-center text-sm">
//           {"Don't have an account? "}
//           <a className="underline" href="#">
//             Sign up
//           </a>
//         </div>

//         <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
//           <span>Secured by</span>
//           <svg
//             className="w-16"
//             viewBox="0 0 65 19"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M12.878 7.152c1.485 0 2.5 1.016 2.5 2.501 0 1.484-1.015 2.5-2.5 2.5-1.485 0-2.501-1.016-2.501-2.5 0-1.485 1.016-2.501 2.501-2.501ZM3.5 0h18.756c1.93 0 3.5 1.57 3.5 3.5v12c0 1.93-1.57 3.5-3.5 3.5H3.5C1.57 19 0 17.43 0 15.5v-12C0 1.57 1.57 0 3.5 0Zm0 2a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h18.756a1.5 1.5 0 0 0 1.5-1.5v-12a1.5 1.5 0 0 0-1.5-1.5H3.5Zm9.378 7.152c.275 0 .5.226.5.501a.501.501 0 0 1-1.001 0c0-.275.225-.501.501-.501Z"
//               fill="currentColor"
//             />
//             <path
//               d="M34.903 16V9.872h.01l3.921 5.99h1.354V7.18h-1.568v6.119h-.01l-3.912-5.981h-1.363V16h1.568Zm9.89.144c2.046 0 3.474-1.53 3.474-3.609v-.018c0-2.079-1.428-3.6-3.474-3.6-2.037 0-3.465 1.53-3.465 3.6v.018c0 2.079 1.419 3.609 3.465 3.609Zm.009-1.269c-1.266 0-1.986-1.086-1.986-2.34v-.018c0-1.245.72-2.331 1.977-2.331 1.266 0 1.986 1.086 1.986 2.331v.018c0 1.254-.72 2.34-1.977 2.34Zm6.815 1.125h1.473v-2.997h1.653L56.261 16h1.743l-1.798-3.609c.936-.432 1.473-1.26 1.473-2.313v-.018c0-1.71-1.212-2.88-3.069-2.88h-3.492V16Zm1.473-4.185v-3.456h1.914c1.086 0 1.644.639 1.644 1.71v.018c0 1.017-.567 1.728-1.635 1.728h-1.923ZM61.71 16V7.18h-1.472V16h1.472Z"
//               fill="currentColor"
//             />
//           </svg>
//         </div>
//       </Card>
//     </div>
//   );
// };
