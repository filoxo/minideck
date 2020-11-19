# minideck

A simple MDX-powered deck.

## How it works

[Check out the demo!](https://minideck-demo.netlify.app/) This project uses:

- [Parcel](https://parceljs.org/) for transpiling, serving, and building files
- [MDX](https://mdxjs.com/) for authoring using Markdown syntax
- [React](https://reactjs.org/) custom components
- [Tailwind CSS](https://tailwindcss.com/) utility classes, plus [remark-attr](https://github.com/arobase-che/remark-attr#readme) and [classnames](https://github.com/JedWatson/classnames#readme) for ease of use
- [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer) for parsing and styling code blocks

## Usage

Instead of making this an npm package that requires a configuration api, simply use [degit](https://github.com/Rich-Harris/degit) to copy these project files over as scaffolding for your own deck.

```sh
# first
npx degit filoxo/minideck#main your-presentation-name
# then
yarn install
# and finally
yarn start
```

### Prod build

Generate a production-ready version of your slide deck. This is ideal for deploying your slides as static assets and making them publicly available.

```sh
# build to dist/
yarn build
# serve prod locally; recommended for better perf when presenting
npx serve -d dist
```

## Extensibility

Again, rather than requiring configuration, you have access to all of the underlying components and tooling. Need to change something? Just find the file and tweak it.

- Add your own presentation content in `content.mdx`
- Import your own components in `content.mdx`, or add them to the `components` list in `index.js` to make them globally available to the MDX file
- Want change the styling?
  - Use [Tailwind classes](https://nerdcave.com/tailwind-cheat-sheet) throughout by either
    - using inline attribute syntax (learn more at the [remark-attr repo](https://github.com/arobase-che/remark-attr#readme))

        `_Warning!_{.text-red-500}`

    - or in components, optionally with [classnames](https://github.com/JedWatson/classnames#readme) for conditional logic
  - Or add a different prebuilt CSS theme into the index.html
- Change the code theme? Change the imported theme in `Code.js`
- More features? Feel free to send a PR that you think would help everyone!
