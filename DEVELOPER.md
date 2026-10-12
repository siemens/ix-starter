# Developer Guide

## Releasing `create-siemens-web`

Releases are automated with [Release Please](https://github.com/googleapis/release-please).
It creates a release pull request from conventional commits merged into `main`.
Merging that pull request creates the Git tag and GitHub Release, then publishes the
package to npm with trusted publishing.

### One-time maintainer setup

Complete these steps before the first release:

1. Ensure `create-siemens-web` exists on npm. If the package does not yet exist, an
   npm owner must claim the package name first.
2. In the package's npm settings, configure **Trusted Publishing** for GitHub Actions:
   - Organization or user: `siemens`
   - Repository: `ix-starter`
   - Workflow filename: `publish.yml`
   - Environment name: leave blank, unless the repository uses a GitHub Environment
     as an additional release gate.
3. Install the [Release Please GitHub App](https://github.com/apps/release-please)
   for this repository and add its token as the `RELEASE_PLEASE_TOKEN` repository
   secret. The token needs permission to create pull requests, tags, and releases.

`RELEASE_PLEASE_TOKEN` is required instead of `GITHUB_TOKEN`: GitHub does not start
the `Publish to npm` workflow for a release event created with `GITHUB_TOKEN`.

### Prepare a release

1. Use [Conventional Commits](https://www.conventionalcommits.org/) in pull request
   titles and squash-merge commit messages. The merge commit is what Release Please
   reads after it reaches `main`.
2. Use `fix:` for a patch release, `feat:` for a minor release, and `feat!:` or a
   `BREAKING CHANGE:` footer for a major release.
3. Merge the change into `main`. The **Release Please** workflow opens or updates a
   release pull request for `create-siemens-web`.
4. Review the generated release pull request. Confirm the package version,
   `CHANGELOG.md`, and `.release-please-manifest.json` are correct, and let the
   standard pull request checks complete.

Commits such as `chore:`, `docs:`, `refactor:`, and `build:` do not create or update
a release pull request by themselves.

### Publish the release

1. Merge the reviewed Release Please pull request into `main`.
2. Confirm that the **Release Please** workflow created the `vX.Y.Z` tag and GitHub
   Release.
3. Confirm that the **Publish to npm** workflow completed successfully. It installs
   dependencies, builds `create-siemens-web`, and publishes the release through npm
   OIDC trusted publishing.
4. Verify the published version with:

   ```sh
   npm view create-siemens-web version
   ```

### Recover from failures

- If the release pull request is incorrect, fix the relevant conventional commits or
  configuration on `main`. Release Please updates the same pull request on its next
  run. Do not manually edit a version or create a tag.
- If the Release Please workflow fails, resolve its reported permission or
  configuration error and rerun the workflow from GitHub Actions.
- If npm publishing fails after a GitHub Release is created, resolve the npm trusted
  publisher or build error and rerun the failed **Publish to npm** workflow. Do not
  create another GitHub Release or run `npm publish` locally.

### References

- [Release Please documentation](https://github.com/googleapis/release-please)
- [npm trusted publishing documentation](https://docs.npmjs.com/trusted-publishers)
- [GitHub Actions event triggering](https://docs.github.com/actions/how-tos/writing-workflows/choosing-when-your-workflow-runs/triggering-a-workflow)
