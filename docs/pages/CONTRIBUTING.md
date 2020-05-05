# CxSAST Custom Report Contributing Guidelines

Please feel free to help **CxSAST Custom Report** to be better/more advanced tool, whether it’s by fixing bugs, feature development, or any other contributions.

## Issues

For **bugs**, **feature requests**, **incorrect documentation** or any problem you have with CxSAST Custom Report, you can open a new issue. If you need help to use CxSAST Custom Report or if you aren't sure if your issue is a bug or not, don’t worry! Post your problem on GitHub and the team will help you along.

### Report a bug

1. **Search for similar opened or closed issues** ([link](https://github.com/cxpsemea/cxsast_custom_reporting/issues)).
   It is likely that someone else got the same problem as you before and already reported it.
2. **Make sure of the following:**
   - [ ] There are no [opened or closed issues](https://github.com/cxpsemea/cxsast_custom_reporting/issues) similar to this bug
   - [ ] This is a bug and not a missing feature
   - [ ] This bug comes from CxSAST Custom Report itself and not from other tool or configuration of your cmd
   - [ ] This bug is still present in the latest release
3. **Create your issue** ([link](https://github.com/cxpsemea/cxsast_custom_reporting/issues/new)).
   Please provide a complete description of your bug: What do you expect? What happens instead? Which version of CxSAST Custom Report do you use, which ones are affected by the bug? Keep in mind that someone will spend a lot of time to understand your issue, make the task easy for him/her.

### Request for a new feature

1. **Search for similar opened or closed issues** ([link](https://github.com/cxpsemea/cxsast_custom_reporting/issues)).
   It is likely that someone else needed a similar feature as yours and already requested it.
2. **Make sure of the following:**
   - [ ] There are no [opened or closed issues](https://github.com/cxpsemea/cxsast_custom_reporting/issues) similar to your request
   - [ ] This is a missing feature and not a bug
3. **Prepare a clear use case for the requested feature**.
   This will help you to make sure that this is the feature you want, and us to better understand your needs and how it would benefit to everyone the best way.
4. **Create your issue** ([link](https://github.com/cxpsemea/cxsast_custom_reporting/issues/new)).
   Please provide a complete description of the feature you want, the use case you prepared will help you for that. After you created your issue, if you feel ready, you can start working on a pull request (please tell us so). See [Contributions](#contributions) below.

## Contributions

All new features and bug fixes should be submitted as pull requests, so the community can review and discuss them. The rule is the same for everyone, for new contributors as for Core Team members.

Before working on a bug fix or a new feature, please make sure of the following:

- [ ] **There is no similar pull request that was rejected or is not merged yet** ([link](https://github.com/cxpsemea/cxsast_custom_reporting/pulls)).
- [ ] **There is an open issue related to this bug or feature**([link](https://github.com/cxpsemea/cxsast_custom_reporting/issues)).

After you made these checks, please follow these advices to create your pull requests:

1. **Work on a dedicated Git branch**.

2. **Use our standard format for branch, commit and pull request names**.
   It must reference the related issue, be written in the "imperative" form (like if it was completing `now the software should...`) and be prefixed by a type (`feat` for new feature, `fix` if you repair something, `docs` for documentation, `refactor` for non-breaking code cleaning, `style` for code formatting, `tests` for unit or visual tests or `chore` for boring day-to-day tasks not affecting the actual code. See the [AngularJs Git Commit Message Convention](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)). For example: `docs: improve Dropdown usage example #123` for commit/pull request names and `docs/dropdown-improve-usage-example-123` for the branch name.
3. **Describe everything you did and why in your commit and pull request body**.
   Even if you already mentioned it in the related issue, please explain what you did and for which reasons. Give references to related issues, comments, test cases or any useful resources.
4. **Provide a clear and readable code**.
   Make sure that the code you changed is consistent across components and that anyone can easily understand its behavior. Split it in abstract functions, avoid code duplication and add comments when needed. You can open a "work-in-progress" pull request (prefix it with "[WIP]") if you need any help with that.
5. **Make sure that everything works and tests pass**.
   You must absolutely check that everything still works after your changes. Please also add tests for features you added or uncovered bugs you fixed.
6. **Create your pull request** ([link](https://github.com/cxpsemea/cxsast_custom_reporting/compare)).
   Make sure it targets the `master` branch.

When you submit a pull request, @mention a few people you’d like to help you review it. Once those people have signed off on it, the pull request can be merged! Core Team members will handle the merge itself.
