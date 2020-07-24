import markdownToHtml from '@/lib/markdownToHtml'

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getLayoutContent() {
  const { navigation } = await fetchAPI(`{
    navigation {
      pages {
        id,
        name,
        slug
      }
    }
  }`)

  const { footer } = await fetchAPI(`{
    footer {
      copyright,
      socials {
        id,
        name,
        logo {
          url
        },
        url
      },
      pages {
        id,
        name,
        slug
      }
    }
  }`)

  return {
    navigation,
    footer,
  }
}

export async function getAllMembers() {
  const data = await fetchAPI(`{
    members {
      id,
      name,
      role,
      achievements {
        id,
        achievement
      },
      experience,
      picture {
        url,
        alternativeText
      }
    }
  }`)

  return data
}

export async function getAllServices() {
  const data = await fetchAPI(`{
    services {
      id,
      name,
      image {
        url
      },
      description,
    }
  }`)

  return data
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )
  return data?.posts[0]
}

export async function getAllPosts() {
  const data = await fetchAPI(`
  {
    posts {
      id,
      title,
      content,
      slug,
      excerpt,
      image {
        url
      },
      date,
      status
    }
  }`)

  return data
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts {
        slug
      }
    }
  `)

  return data?.posts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 10, where: $where) {
        title
        slug
        excerpt
        date
        coverImage {
          url
        }
        author {
          name
          picture {
            url
          }
        }
      }
    }
  `,
    {
      variables: {
        where: {
          ...(preview ? {} : { status: 'published' }),
        },
      },
    }
  )
  return data?.posts
}

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      title
      slug
      content
      date
      ogImage: coverImage{
        url
      }
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }

    morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
      title
      slug
      excerpt
      date
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }
  }
  `,
    {
      preview,
      variables: {
        where: {
          slug,
          ...(preview ? {} : { status: 'published' }),
        },
        where_ne: {
          ...(preview ? {} : { status: 'published' }),
          slug_ne: slug,
        },
      },
    }
  )
  return data
}
