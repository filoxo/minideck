import reactRefresh from '@vitejs/plugin-react-refresh'
import mdx from 'vite-plugin-mdx'
import remarkAttr from 'remark-attr'

const mdxOptions = {
  remarkPlugins: [remarkAttr],
}

export default {
  plugins: [
    reactRefresh(), 
    mdx(mdxOptions)
  ],
}
