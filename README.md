<br>
<br>
<br>
<div align="center">
  <img alt="Tremor Logo" src="images/tremor-light-beta.svg" height="50"/>
<br>
<br>
<br>

  <div align="center">
    <a href="https://www.npmjs.com/package/@tremor/react">
      <img alt="npm" src="https://img.shields.io/npm/dm/@tremor/react?color=5C9BA1&label=npm&logo=npm">
    </a>
    <a href="https://tremor.so/docs/getting-started/introduction">
      <img alt="Read the documentation" src="https://img.shields.io/badge/Docs-blue?style=flat&logo=readthedocs&labelColor=5c5c5c&color=5C9BA1" height="20" width="auto">
    </a>
    <a href="https://github.com/tremorlabs/tremor/blob/main/License">
      <img alt="License Apache 2.0" src="https://img.shields.io/badge/license-Apache 2.0-blue.svg?style=flat&color=5C9BA1" height="20" width="auto">
    </a>
    <a href="https://join.slack.com/t/tremor-community/shared_invite/zt-1u8jqmcmq-Fdr9B6MbnO7u8FkGh~2Ylg">
      <img src="https://img.shields.io/badge/Join-important.svg?color=4A154B&label=Slack&logo=slack" alt="Join Slack" />
    </a>
    <a href="https://twitter.com/intent/follow?screen_name=tremorlabs">
      <img src="https://img.shields.io/twitter/follow/tremorlabs?style=social" alt="Follow on Twitter" />
    </a>
  </div>
  <h3 align="center">
    <a href="https://www.tremor.so/docs/getting-started/installation">Documentation</a> &bull;
    <a href="https://demo.tremor.so/">Demo Dashboard</a> &bull;
    <a href="https://www.tremor.so">Website</a>
  </h3>

<br>

  <h1>The react library to build dashboards fast</h1>

</div>

[Tremor](https://tremor.so/) lets you create simple and modular components to build insightful dashboards in a breeze. Fully open-source, made by data scientists and software engineers with a sweet spot for design.

<br>
<br>

![Tremor Banner](images/banner1.png)

<br>
<br>

## Getting Started

You can use tremor either within a [React](https://reactjs.org/) or [Next.js](https://nextjs.org) Project.
For new projects, we recommend using Next.js, as it also provides a simple deployment workflow through the [Vercel](https://vercel.com/docs) platform.
For other Frameworks, see our [Installation Guide](https://www.tremor.so/docs/getting-started/installation).

<br>

## Using NextJS 

In your terminal, we create a new Next project:

```bash
npx create-next-app my-project --typescript 
cd my-project
```

<br>

Install tremor from your command line via npm.

```bash
npm install @tremor/react
```

<br>

Install Tailwind CSS and its peer dependencies

```bash
npm install -D tailwindcss postcss autoprefixer 
npx tailwindcss init -p
```
<br>

Add the paths to all of your template files in your `tailwind.config.js` file.

```diff
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
+   './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
    
    // Or if using src directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {},
    },
    plugins: [],
}
```

Add the `@tailwind` directives for each Tailwind's layers to your `globals.css` file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Start the dev server

```bash
npm run dev
```

<br>

**💡 Hint:** Since we are in beta, please be aware that there might be breaking changes in the future.
<br>

## Example

With tremor creating an analytical interface is easy.

<br>

```jsx
//Card.tsx
import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";
export default () => (
  <Card className="max-w-sm">
    <Text>Sales</Text>
    <Metric>$ 71,465</Metric>
    <Flex className='mt-4'>
        <Text>32% of annual target</Text>
        <Text>$ 225,000</Text>
    </Flex>
    <ProgressBar percentageValue={ 32 } className="mt-2" />
  </Card>
);
```
<br>

![Tremor Banner](images/example.png)

<br>

If you want to see how you can build your first dashboard, have a look at our [documentation](https://tremor.so/docs/getting-started/demo-dashboard).

## Community and Contribution

We are always looking for new ideas or other ways to improve tremor. If you have developed anything cool or found a bug, send us a pull request.
<br>
<br>

## License

[Apache License 2.0](https://github.com/tremorlabs/tremor/blob/main/License)

Copyright &copy;  2023 Tremor. All rights reserved.
