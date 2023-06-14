<br>
<br>
<br>
<div align="center">
  <img alt="Tremor Logo" src="images/tremor-logo.svg" height="50"/>
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
    <a href="https://www.tremor.so">Website</a>
  </h3>

<br>

  <h1>The react library to build dashboards fast</h1>

</div>

[Tremor](https://tremor.so/) lets you create simple and modular components to build insightful dashboards in a breeze. Fully open-source, made by data scientists and software engineers with a sweet spot for design.

<br>
<br>

![Tremor Banner](images/banner-github-readme.png)

<br>
<br>

## Getting Started

For new projects, we recommend using Next.js 13.4+. For other frameworks, see our [Installation Guide](https://www.tremor.so/docs/getting-started/installation). To make use of the library we also need Tailwind CSS setup in the project. For manual installation, refer to the installation guide on our website.

<br>

## Using NextJS

In your terminal, we create a new Next project. When prompted `Would you like to use Tailwind CSS with this project?`, select `Yes`.

```bash
npx create-next-app@latest my-project
cd my-project
```

### Installation using the Tremor CLI

We recommend installing Tremor with our CLI. To do so, run this command and select Next as your framework. If you prefer a manual installation, check the [installation guide](https://www.tremor.so/docs/getting-started/installation) on our website.

```bash
npx @tremor/cli@latest init
```

Now you are set and you can start the dev server.

```bash
npm run dev
```

## Example

With Tremor creating an analytical interface is easy.

<br>

```jsx
//Card.tsx
import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";
export default () => (
  <Card className="max-w-sm">
    <Text>Sales</Text>
    <Metric>$ 71,465</Metric>
    <Flex className="mt-4">
      <Text>32% of annual target</Text>
      <Text>$ 225,000</Text>
    </Flex>
    <ProgressBar value={32} className="mt-2" />
  </Card>
);
```

<br>

![Tremor Example](images/example.png)

<br>

## Community and Contribution

We are always looking for new ideas or other ways to improve Tremor. If you have developed anything cool or found a bug, send us a pull request.
<br>
<br>

## License

[Apache License 2.0](https://github.com/tremorlabs/tremor/blob/main/License)

Copyright &copy; 2023 Tremor. All rights reserved.
