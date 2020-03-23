[![Netlify Status][netlify-image] ][netlify-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]

[dependencies-image]: https://david-dm.org/ljosberinn/wirvsvirus-ihyp-hackathon.png
[dependencies-url]: https://david-dm.org/ljosberinn/wirvsvirus-ihyp-hackathon
[devdependencies-image]: https://david-dm.org/ljosberinn/wirvsvirus-ihyp-hackathon/dev-status.png
[devdependencies-url]: https://david-dm.org/ljosberinn/wirvsvirus-ihyp-hackathon#info=devDependencies
[netlify-image]: https://api.netlify.com/api/v1/badges/b0f26055-bf1d-4448-b31d-ac8a9869fd04/deploy-status
[netlify-url]: https://app.netlify.com/sites/wirvsvirus-ihyp-hackathon/deploys
[license-badge]: https://img.shields.io/github/license/ljosberinn/wirvsvirus-ihyp-hackathon

[![License][license-badge]][license-badge]

# Technologies

## Host

- Netlify

## i18n

- [react-i18next](https://github.com/i18next/react-i18next)

## Error Tracking

- [Sentry](https://sentry.io/)
- [LogRocket](https://logrocket.com/)

## Styling

- SCSS via node-sass
- [bulma](https://bulma.io/) via [rbx](https://github.com/dfee/rbx)
- themed via [bulmaswatch](https://github.com/jenil/bulmaswatch)
- Icons via [react-icons](https://github.com/react-icons/react-icons)

## Backend

- AWS Transcribe
- Amazon Connect
- Google DialogFlow
- Google Cloud Platform
- AWS Comprehend
- DynamoDB & Lambdas

## Auth

- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/) (GitHub & Google & mail as provider)
- implemented via [react-netlify-identity](https://github.com/sw-yx/react-netlify-identity)

## SEO

- [react-helmet](https://github.com/nfl/react-helmet)

## Misc

- [react-reveal](https://www.react-reveal.com/docs/) & [react-awesome-reveal](https://github.com/dennismorello/react-awesome-reveal)
- [react-router](https://reacttraining.com/react-router/web/guides/quick-start)
- [@loadable/component](https://github.com/gregberge/loadable-components)
- [react-toastify](https://github.com/fkhadra/react-toastify)

# Requirements

- [Node.js](https://nodejs.org/en/)
- preferably [yarn](https://yarnpkg.com/en/)
- preferably [VSCode](https://code.visualstudio.com/insiders/)

# Development

_Not supposed to be developed by anyone other than the authors._

```bash
git clone https://github.com/ljosberinn/wirvsvirus-ihyp-hackathon
cd wirvsvirus-ihyp-hackathon
cp .env.example .env
# edit .env
yarn install
code .
```
