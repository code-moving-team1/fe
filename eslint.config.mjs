// eslint.config.mjs
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  // 무시 경로
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  // JS/TS/React/Next 규칙 (Flat)
  {
    files: ["**/*.{ts,tsx,js,jsx}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        // type-aware 규칙 쓸 거면 아래 2줄 주석 해제
        // project: "./tsconfig.json",
        // tsconfigRootDir: process.cwd(),
      },
    },

    settings: {
      react: { version: "detect" },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },

    rules: {
      // React / Hooks 권장
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Next.js core-web-vitals (Flat에서 직접 주입)
      ...nextPlugin.configs["core-web-vitals"].rules,

      // 네가 원하는 팀 규칙
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      // Next 권장 중 현실적으로 많이 끄는 것들
      "@next/next/no-img-element": "off", // <img> 사용 허용
      "@next/next/google-font-display": "off", // google-font-display 경고 끔
      "@next/next/google-font-preconnect": "off",
      "@next/next/no-document-import-in-page": "off", // (pages 라우터에만 해당) app 라우터면 꺼도 무방
      "@next/next/no-page-custom-font": "off",
    },
  },
];

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     ignores: [
//       "node_modules/**",
//       ".next/**",
//       "out/**",
//       "build/**",
//       "next-env.d.ts",
//     ],
//   },
//   {
//     rules: {
//       "@typescript-eslint/no-unused-vars": [
//         "warn", // 에러(error) 대신 경고(warn)로 표시
//         {
//           // '^_`는 '밑줄로 시작하는' 이라는 의미의 정규표현식입니다.
//           // 이 패턴에 맞는 인자(argument)는 사용하지 않아도 경고하지 않도록 설정합니다.
//           argsIgnorePattern: "^_",
//         },
//       ],
//     },
//   },
// ];

// export default eslintConfig;
