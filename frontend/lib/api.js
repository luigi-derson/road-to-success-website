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

export async function getInstagramPosts() {
  const res = await fetch(
    `https://graph.instagram.com/17841408545268029/media?fields=id,media_url,caption,permalink&limit=4&access_token=${process.env.INSTAGRAM_TOKEN}`
  ).then((data) => data.json())

  return res?.data
}

export async function getPageContent(slug) {
  const data = await fetchAPI(
    `
    query PageContent($where: JSON){
      pages(where:$where) {
        name,
        content
      }
    }
  `,
    {
      variables: {
        where: {
          slug: slug,
        },
      },
    }
  )

  return data
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

export async function getAllSponsors() {
  const { sponsors } = await fetchAPI(`{
    sponsors {
      id,
      logo {
        url
      },
      name,
      website,
    }
  }`)

  return sponsors
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
      posts(sort: "date:desc", limit: 3, where: $where) {
        id,
        title
        slug
        excerpt
        date
        image {
          url
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

export async function getAllDrivers() {
  const data = await fetchAPI(
    `
    query Drivers($where: JSON){
      drivers(where: $where) {
        id,
        name
        portrait {
          url
        }
      }
     }
  `,
    {
      variables: {
        where: {
          active: true,
        },
      },
    }
  )

  return data?.drivers
}

export async function getAllTeams() {
  const data = await fetchAPI(
    `
    query Teams($where: JSON){
      teams(where: $where) {
        id,
        name
        logo {
          url
        }
      }
     }
  `,
    {
      variables: {
        where: {
          active: true,
        },
      },
    }
  )

  return data?.teams
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
      ogImage: image{
        url
      }
      image {
        url
      }
    }

    morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
      title
      slug
      excerpt
      date
      image {
        url
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
