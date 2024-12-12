import { useComponents } from "@/lib/store";
// export const treeGen = (parent: string) => {
//   switch(parent)  {
//     case "forget-password":
//        if(forgetPassExists) {}
//   }
// }

export const NEXT_ELEMENTS = [
  {
    id: "1",
    slug: "src_root",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        slug: "app_dir",
        name: "app",
        children: [
          {
            id: "2.1",
            slug: "auth_group",
            isSelectable: true,
            name: "(auth)",
            children: [
              {
                id: "2.2",
                slug: "login",
                isSelectable: true,
                name: "login",
                children: [
                  {
                    id: "2.3",
                    slug: "login_page",
                    isSelectable: true,
                    name: "page.tsx",
                  },
                ],
              },
              {
                id: "2.4",
                slug: "signup",
                isSelectable: true,
                name: "signup",
                children: [
                  {
                    id: "2.5",
                    slug: "signup_page",
                    isSelectable: true,
                    name: "page.tsx",
                  },
                ],
              },
            ],
          },
          { id: "3", isSelectable: false, name: "layout.tsx" },
          { id: "4", isSelectable: false, name: "page.tsx" },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        slug: "components",
        children: [
          {
            id: "6",
            isSelectable: true,
            slug: "login",
            name: "login.tsx",
          },
          {
            id: "7",
            isSelectable: true,
            slug: "signup",
            name: "signup.tsx",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        slug: "lib",
        children: [
          {
            id: "9",
            isSelectable: true,
            slug: "client",
            name: "client.ts",
          },
          { id: "10", isSelectable: true, slug: "auth", name: "auth.ts" },
        ],
      },
      {
        id: "9",
        isSelectable: true,
        name: ".env",
        slug: "env",
      },
    ],
  },
];
export const REACT_ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          { id: "3", isSelectable: false, name: "layout.tsx" },
          { id: "4", isSelectable: false, name: "page.tsx" },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          { id: "6", isSelectable: true, name: "login.tsx" },
          { id: "7", isSelectable: true, name: "signup.tsx" },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          { id: "9", isSelectable: true, name: "client.ts" },
          { id: "10", isSelectable: true, name: "auth.ts" },
        ],
      },
      {
        id: "9",
        isSelectable: true,
        name: ".env",
        slug: "env",
      },
    ],
  },
];
export const SVELTE_ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          { id: "3", isSelectable: true, name: "layout.svelte" },
          { id: "4", isSelectable: true, name: "page.svelte" },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          { id: "6", isSelectable: true, name: "login.svelte" },
          { id: "7", isSelectable: true, name: "signup.svelte" },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          { id: "9", isSelectable: true, name: "utils.js" },
          { id: "10", isSelectable: true, name: "auth.js" },
        ],
      },
      {
        id: "9",
        isSelectable: true,
        name: ".env",
        slug: "env",
      },
    ],
  },
];

export const NUXT_ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          { id: "3", isSelectable: true, name: "layout.vue" },
          { id: "4", isSelectable: true, name: "page.vue" },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          { id: "6", isSelectable: true, name: "login.vue" },
          { id: "7", isSelectable: true, name: "signup.vue" },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          { id: "9", isSelectable: true, name: "utils.js" },
          { id: "10", isSelectable: true, name: "auth.js" },
        ],
      },
      {
        id: "9",
        isSelectable: true,
        name: ".env",
        slug: "env",
      },
    ],
  },
];

export const SOLID_ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          { id: "3", isSelectable: true, name: "layout.jsx" },
          { id: "4", isSelectable: true, name: "page.jsx" },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          { id: "6", isSelectable: true, name: "login.jsx" },
          { id: "7", isSelectable: true, name: "signup.jsx" },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          { id: "9", isSelectable: true, name: "utils.js" },
          { id: "10", isSelectable: true, name: "auth.js" },
        ],
      },
      {
        id: "9",
        isSelectable: true,
        name: ".env",
        slug: "env",
      },
    ],
  },
];

export const ASTRO_ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          { id: "3", isSelectable: true, name: "layout.astro" },
          { id: "4", isSelectable: true, name: "page.astro" },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          { id: "6", isSelectable: true, name: "login.astro" },
          { id: "7", isSelectable: true, name: "signup.astro" },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          { id: "9", isSelectable: true, name: "utils.js" },
          { id: "10", isSelectable: true, name: "auth.js" },
        ],
      },
      {
        id: "9",
        isSelectable: true,
        name: ".env",
        slug: "env",
      },
    ],
  },
];

export const REMIX_ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          { id: "3", isSelectable: true, name: "layout.jsx" },
          { id: "4", isSelectable: true, name: "page.jsx" },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          { id: "6", isSelectable: true, name: "login.jsx" },
          { id: "7", isSelectable: true, name: "signup.jsx" },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          { id: "9", isSelectable: true, name: "utils.js" },
          { id: "10", isSelectable: true, name: "auth.js" },
        ],
      },
      {
        id: "9",
        isSelectable: true,
        name: ".env",
        slug: "env",
      },
    ],
  },
];
