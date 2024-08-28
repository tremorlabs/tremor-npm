<br />
<br />
<p align="center">
  <a href="https://npm.tremor.so">
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

<div align="center">
  <a href="https://npmjs.com/package/@tremor/react">
    <img alt="npm" src="https://img.shields.io/npm/dm/@tremor/react?color=3b82f6&label=npm&logo=npm&labelColor=334155">
  </a>
  <a href="https://npm.tremor.so/docs/getting-started/installation">
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
  <a href="https://npm.tremor.so/docs/getting-started/installation">Documentation</a> &bull;
  <a href="https://npm.tremor.so">Website</a>
</h3>
<br />
  <h1>React components to build charts and dashboards</h1>
</div>

[Tremor NPM](https://npm.tremor.so/) 20+ open-source components built on top of Tailwind CSS to make visualizing data simple again. Fully open-source, made by data scientists and software engineers with a sweet spot for design.

<br />

![Tremor Banner](images/banner-github-readme.png)

<br />

## Getting Started

See our [Installation Guide](https://npm.tremor.so/docs/getting-started/installation). To make use of the library we also need Tailwind CSS setup in the project.

## Example

With Tremor creating an analytical interface is easy.

```jsx
"use client";
import { AreaChart, Card } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 23",
    "Route Requests": 289,
    "Station Requests": 233,
  },
  // ...
  {
    date: "Oct 23",
    "Route Requests": 283,
    "Station Requests": 247,
  },
];

export default function Example() {
  return (
    <Card className="max-w-4xl">
      <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Total Requests
      </span>
      <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        6,568
      </p>
      <AreaChart
        className="mt-2 h-80"
        data={chartdata}
        index="date"
        categories={["Route Requests", "Station Requests"]}
        colors={["indigo", "rose"]}
        yAxisWidth={33}
      />
    </Card>
  );
}
```

<br />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/example-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="images/example-light.png">
  <img alt="Tremor Example" src="images/example-light.png"/>
</picture>

## Community and Contribution

We are always looking for new ideas or other ways to improve Tremor NPM. If you have developed anything cool or found a bug, send us a pull request. Check out our Contributor License Agreement [here](https://tremor.so/contributors).

## License

[Apache License 2.0](https://github.com/tremorlabs/tremor/blob/main/License)

Copyright &copy; 2024 Tremor Labs, Inc. All rights reserved.
