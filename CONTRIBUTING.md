## **Contributing to Tremor**

Thanks for your interest in contributing to Tremor. Please take a moment to review this document before submitting a pull request. This document will outline how to submit changes to this repository and which conventions to follow. If you are ever in doubt about anything we encourage you to reach out on [Slack](https://join.slack.com/t/tremor-community/shared_invite/zt-1u8jqmcmq-Fdr9B6MbnO7u8FkGh~2Ylg), [open a discussion](#discussions), or [shoot us an email](mailto:hello@tremor.so).


### **Prerequisites**

- You are familiar with [issues](#issues) and [pull requests](#pulls).
- You have read the [docs](https://www.tremor.so/docs/getting-started/installation).

### **Issues before PRs**

1. Before you start working on a change please make sure that there is an issue for what you will be working on. You can either find an [existing issue](https://github.com/tremorlabs/tremor/issues) or [open a new issue](https://github.com/tremorlabs/tremor/issues/new/choose) if none exists.
2. When you are ready to start working on a change you should first [fork the Tremor repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) and [branch out](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository) from the `main` branch.
3. Make your changes.
4. [Open a pull request towards the main branch in the Tremor repo](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Then, our team will review, comment and eventually approve your PR.

### **Branches**

All changes should be part of a branch and submitted as a pull request - your branches should be prefixed with one of:

- `fix/` for bug fixes
- `feat/` for features

### **Commits**

Strive towards keeping your commits small and isolated - this helps the reviewer understand what is going on and makes it easier to process your requests.

### **Pull Requests**

Once your changes are ready you must submit your branch as a pull request. Your pull request should be opened against the `main` branch in the main Tremor repo.

In your PR's description, you should follow the structure as outlined in the PR template:

1. Description: Describe your changes in detail.
2. Related issue(s): Please link to the issue.
3. What kind of change does this PR introduce?: Select from template options.
4. Does this PR introduce a breaking change?: Select Yes/No.
5. How has This been tested?: Please describe how you tested your changes.
6. Screenshots (if appropriate):

**The PR fulfills these requirements:**

- [ ] It's submitted to the `main` branch.
- [ ] When resolving a specific issue, it's referenced in the related issue section above.
- [ ] My change requires a change to the documentation. (Managed by Tremor Team).
- [ ] I have added tests to cover my changes.

* Be sure to check the "Allow edits from maintainers" option while creating your PR.
* If your PR refers to or fixes an issue, be sure to add refs #XXX or fixes #XXX to the related issue section. Replacing XXX with the respective issue number.

Be sure to fill the PR Template accordingly.
We encourage that you do a self-review prior to requesting a review. To do a self review click the review button in the top right corner, go through your code and annotate your changes. This makes it easier for the reviewer to process your PR.

### **Documentation**

- We generally encourage you to document your changes through comments in your code.
- If you alter user-facing behavior you must provide documentation for such changes, for reference, check out [our documentation]([url](https://www.tremor.so/docs/getting-started/introduction)).

### **Licensing**
By contributing to Tremor, you agree that your contributions will be licensed under the [Apache License 2.0](https://github.com/tremorlabs/tremor/blob/main/License) license. By submitting your pull request, you agree to our [Contributor License Agreement (CLA)](https://www.tremor.so/contributors). This agreement clarifies our ability to incorporate your contributions.
