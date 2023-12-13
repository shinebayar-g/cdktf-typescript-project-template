# CDKTF Typescript project template

- Uses yarn v4 as a slightly faster but fully compatible `npm` alternative. `pnpm` is not fully compatible with `npm`. Also `yarn` is the only package manager that supports git protocol with workspaces. With git protocol support, you don't have to publish nodejs packages to package registry. Just download straight from the git repository. Similar to Terraform's git module support. See <https://yarnpkg.com/protocol/git#workspaces-support>.
- Uses [`tsx`](https://github.com/privatenumber/tsx) to run Typescript code directly. No JS files are compiled. Typescript is correctly configured to run with tsx.
