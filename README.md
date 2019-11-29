# minideck

A simple MDX-powered deck.

## How it works

This project uses:

- [Parcel](https://parceljs.org/) for transpiling, serving, and building files
- [MDX](https://mdxjs.com/) for authoring using Markdown syntax
- [React](https://reactjs.org/) custom components
- CSS modules configured through [PostCSS](https://postcss.org/)
- [Purecss](https://purecss.io/) for basic semantic, table, and grid styles
- [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer) for styling code blocks

## Usage

Instead of making this an npm package that requires a configuration api, simply use [degit](https://github.com/Rich-Harris/degit) to copy these project files over to act as scaffolding for your own deck.

```sh
# first
mkdir your-presentation
# then
npx degit filoxo/minideck
# and lastly
yarn install
```

## Extensibility

Again, rather than requiring configuration, you have access to all of the underlying components and tooling. Need to change something? Just find the file and tweak it.

- Add your own presentation content in `content.mdx` 
- Change the styling? Modify the style tags in `index.html` or the corresponding component .css file
- Change the code theme? Change the imported theme in `Code.js`
- Add more components? Import them in `content.mdx`, or add them to the `components` list in `index.js`
- Add more features? Feel free to send a PR that you think would help everyone!

## Components

### Deck

`Deck` does two things:

- Iterates through the MDX document and groups elements between `---`s and puts them into `Slide`s
- Tracks that current state of the active slide
  - TODO: sync to URL

### Slide

`Slide` does one thing:

- Finds all `Appear` children and controls when they appear based on if the slide is active

### Code

- Renders code blocks, defaults to `javascript` as the language
- By default, it uses the Github theme

### Appear

- Wraps the rendered element in hidden styling