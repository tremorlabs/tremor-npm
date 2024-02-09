<br />
<br />
<br />
<p align="center">
  <a href="https://tremor.so">
    <picture>
       <source media="(prefers-color-scheme: dark)" srcset="images/tremor-logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="images/tremor-logo-light.svg">
    <img alt="Tremor Logo" src="images/tremor-logo-light.svg" height="50"/>
    </picture>
  </a>
</p>
<div align="center">
<br />
<br />
<br />

<div align="center">
  <a href="https://www.npmjs.com/package/@tremor/react">
    <img alt="npm" src="https://img.shields.io/npm/dm/@tremor/react?color=3b82f6&label=npm&logo=npm&labelColor=334155">
  </a>
  <a href="https://tremor.so/docs/getting-started/introduction">
    <img alt="Read the documentation" src="https://img.shields.io/badge/Docs-blue?style=flat&logo=readthedocs&color=3b82f6&labelColor=334155&logoColor=f5f5f5" height="20" width="auto">
  </a>
  <a href="https://github.com/tremorlabs/tremor/blob/main/License">
    <img alt="License Apache 2.0" src="https://img.shields.io/badge/license-Apache 2.0-blue.svg?style=flat&color=3b82f6&labelColor=334155 " height="20" width="auto">
  </a>
  <a href="https://join.slack.com/t/tremor-community/shared_invite/zt-21ug6czv6-RckDPEAR6GdYOqfMGKOWpQ">
    <img src="https://img.shields.io/badge/Join-important.svg?color=4A154B&label=Slack&logo=slack&labelColor=334155&logoColor=f5f5f5" alt="Join Slack" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=tremorlabs">
    <img src="https://img.shields.io/badge/Follow-important.svg?color=000000&label=@tremorlabs&logo=X&labelColor=334155&logoColor=f5f5f5" alt="Follow at Tremorlabs" />
  </a>
</div>
<h3 align="center">
  <a href="https://www.tremor.so/docs/getting-started/installation">Documentation</a> &bull;
  <a href="https://www.tremor.so">Website</a>
</h3>
<br />
  <h1>The react library to build dashboards fast</h1>
</div>

[Tremor](https://tremor.so/) provides React components to build charts and dashboards. Fully open-source, made by data scientists and software engineers with a sweet spot for design.

<br />

![Tremor Banner](images/banner-github-readme.png)

<br />

## Getting Started

See our [Installation Guide](https://www.tremor.so/docs/getting-started/installation). To make use of the library we also need Tailwind CSS setup in the project.

## Example

With Tremor creating an analytical interface is easy.

```jsx
//Card.tsx
import { Card, ProgressBar } from "@tremor/react";
export default () => (
<Card className="max-w-sm">
  <span className="text-tremor-default text-tremor-content">Sales</span>
  <p className="text-tremor-metric text-tremor-content-strong font-semibold">$71,465</p>
  <div className="flex items-center justify-between">
    <span className="text-tremor-default text-tremor-content">32% of annual target</span>
    <span className="text-tremor-default text-tremor-content">$ 225,000</span>
  </div>
  <ProgressBar value={32} className="mt-2" />
</Card>
);
```

<br />

![Tremor Example](images/example.png)


## Community and Contribution

We are always looking for new ideas or other ways to improve Tremor. If you have developed anything cool or found a bug, send us a pull request. Check out our Contributor License Agreement [here](https://www.tremor.so/contributors).

## License

[Apache License 2.0](https://github.com/tremorlabs/tremor/blob/main/License)

Copyright &copy; 2024 Tremor. All rights reserved.
