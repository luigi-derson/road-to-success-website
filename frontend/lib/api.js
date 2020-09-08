import queryFragments from './queryFragments'
import parseQuery from './parseQuery'

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

export async function getSliderImages() {
  const res = await fetchAPI(`{
    slider {
      images {
        id,
        url,
        alternativeText
      }
    }
  }`)

  return res?.slider.images
}

export async function getMedia() {
  const data = await fetchAPI(`{
    medias {
      id
      title,
      date,
      image {
        url,
        width,
        height
      }
    }
  }`)

  return data?.medias
}

export async function getPageContent(params) {
  const { slug, lng } = params
  const data = await fetchAPI(
    `
    query PageContent($where: JSON){
      pages(where:$where) {
        ...PageContentFragment
      }
    }
    ${queryFragments.pageContent[lng]}
  `,
    {
      variables: {
        where: {
          slug: slug,
        },
      },
    }
  )

  const { pages } = await parseQuery(data)
  return pages[0]
}

export async function getLayoutContent(lang) {
  const navReq = await fetchAPI(`{
      navigation {
        pages {
          id,
          ...PagesFragment
        }
      }

  }
  ${queryFragments.pages[lang]}
  `)

  const footReq = await fetchAPI(`{
    footer {
      ...FooterFragment
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
        ...PagesFragment
      }
    }
  }
  ${queryFragments.pages[lang]}
  ${queryFragments.footer[lang]}
  `)

  const navigation = await parseQuery(navReq.navigation)
  const footer = await parseQuery(footReq.footer)

  return {
    navigation,
    footer,
  }
}

export async function getAllMembers(lang) {
  const data = await fetchAPI(`{
    members {
      id
      order
      ...MembersFragment
      picture {
        url
        alternativeText
      }
    }
  }
  ${queryFragments.members[lang]}
  `)
  const { members } = await parseQuery(data)
  return members
}

export async function getAllServices(lang) {
  const data = await fetchAPI(`{
    services {
      id
      image {
        url
      }
      ...ServicesFragment
    }
  }
  ${queryFragments.services[lang]}
  `)

  return await parseQuery(data)
}

export async function getAllSponsors() {
  const { sponsors } = await fetchAPI(`{
    sponsors {
      id,
      order,
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
        slug_es
      }
    }
  `)

  return data?.posts
}

export async function getAllPostsForHome(lang, preview) {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 3, where: $where) {
        id,
        date
        ...HomePostsFragment
        image {
          url
        }
      }
    }
    ${queryFragments.homePosts[lang]}
  `,
    {
      variables: {
        where: {
          ...(preview ? {} : { status: 'published' }),
        },
      },
    }
  )
  const { posts } = await parseQuery(data)
  return posts
}

export async function getAllDrivers() {
  const data = await fetchAPI(
    `
    query Drivers($where: JSON){
      drivers(where: $where) {
        id,
        name,
        order,
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
        name,
        order,
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

export async function getMaintenanceStatus(lang) {
  const data = await fetchAPI(`{
     maintenance {
        active
        available_date
        ...MaintenanceFragment
        image {
          url
        }
     }
  }
  ${queryFragments.maintenance[lang]}
  `)

  const { maintenance } = await parseQuery(data)
  return maintenance
}

export async function disableMaintenanceMode() {
  await fetchAPI(`
    mutation {
      updateMaintenance(input: { data: { active: false } }) {
        maintenance {
          active
        }
      }
    }
  `)
}

export async function getPostAndMorePosts(params, preview) {
  const { slug, lng } = params
  const slugFieldName = params.lng === 'en' ? 'slug' : 'slug_es'
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      date
      ogImage: image{
        url
      }
      image {
        url
      }
      ...PostsFragment
    }

    morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
      date
      image {
        url
      }
      ...PostsFragment
    }
  }
  ${queryFragments.posts[lng]}
  `,
    {
      preview,
      variables: {
        where: {
          [slugFieldName]: slug,
          ...(preview ? {} : { status: 'published' }),
        },
        where_ne: {
          ...(preview ? {} : { status: 'published' }),
          [`${slugFieldName}_ne`]: slug,
        },
      },
    }
  )

  return await parseQuery(data)
}
