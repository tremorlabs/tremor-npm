# Contributing

Thanks for your interest in contributing to tremor. Please take a moment to review this document before submitting a pull request. This document will outline how to submit changes to this repository and which conventions to follow. If you are ever in doubt about anything we encourage you to reach out either by submitting an issue here or reaching out via [Twitter](https://twitter.com/tremorlabs) or [shoot us an email](mailto:hello@tremor.so).

## Prerequisites

- **You are familiar with GitHub Issues and Pull Requests**
- **You have read the [docs](https://www.tremor.so/docs/getting-started/introduction).**

### Issues before PRs

1. Before you start working on a change please make sure that there is an issue for what you will be working on. You can either find and [existing issue](https://github.com/tremorlabs/tremor/issues) or [open a new issue](https://github.com/tremorlabs/tremor/issues/new) if none exists.
2. When you are ready to start working on a change you should first [fork the tremor repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) and [branch out](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository) from the `main` branch.
3. Make your changes.
4. [Open a pull request towards the main branch in the tremor repo](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Then, our team will review, comment and eventually approve your PR.

### Branches

All changes should be part of a branch and submitted as a pull request - your branches should be prefixed with one of:

- `fix/` for bug fixes
- `feat/` for features

### Commits

Strive towards keeping your commits small and isolated - this helps the reviewer understand what is going on and makes it easier to process your requests.

### Pull Requests

Once your changes are ready you must submit your branch as a pull request. Your pull request should be opened against the `main` branch in the main tremor repo.

In your PR's description you should follow the structure:

- **What** - what changes are in this PR
- **Why** - why are these changes relevant
- **How** - how have the changes been implemented
- **Testing** - how has the changes been tested or how can the reviewer test the feature

We highly encourage that you do a self-review prior to requesting a review. To do a self review click the review button in the top right corner, go through your code and annotate your changes. This makes it easier for the reviewer to process your PR.

### Documentation

- We generally encourage to document your changes through comments in your code.
- If you alter user-facing behavior you must provide documentation for such changes, for reference, check out [our documentation]([url](https://www.tremor.so/docs/getting-started/introduction)).
