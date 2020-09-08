import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/Container'
import PostBody from '@/components/blog/post-body'
import MoreStories from '@/components/blog/more-stories'
import PostHeader from '@/components/blog/post-header'
import SectionSeparator from '@/components/blog/section-separator'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '@/components/blog/post-title'
import Head from 'next/head'
import Meta from '@/components/blog/meta'
import markdownToHtml from '@/lib/markdownToHtml'

import { languages } from '../../../i18n'
import { getLangDict } from '@/utils/language'

export default function Post({ post, morePosts }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Meta />
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mt-12">
              <Head>
                <title>{post.title} | Road To Success</title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.image}
                date={post.date}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </>
  )
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getPostAndMorePosts(params, preview)
  const content = await markdownToHtml(data?.posts[0]?.content || '')

  const { default: lngDict = {} } = await getLangDict(params.lng)

  return {
    props: {
      post: {
        preview,
        ...data?.posts[0],
        content,
      },
      morePosts: data?.morePosts,
      lng: params.lng,
      lngDict,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()

  const paths = languages.reduce((merged, l) => {
    allPosts.forEach((p) => {
      const slug = p[`slug_${l}`] || p.slug
      merged.push(`/${l}/posts/${slug}`)
    })
    return merged
  }, [])

  return {
    paths,
    fallback: true,
  }
}
