import Layout from '@/components/Layout'

import { getAllPostsWithSlug } from '@/lib/api.js'

const Index = () => {
  return (
    <Layout>
      <h1 className="text-5xl font-semibold text-white">Hello world</h1>
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = (await getAllPostsWithSlug()) || []

  return {
    props: {
      allPosts,
    },
  }
}
