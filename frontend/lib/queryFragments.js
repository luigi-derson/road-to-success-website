const queryFragments = {
  pages: {
    en: `
    fragment PagesFragment on Pages {
      name
      slug
    }`,
    es: `
    fragment PagesFragment on Pages {
      name_es
      slug
    }`,
  },
  footer: {
    en: `
      fragment FooterFragment on Footer {
        copyright
      }
    `,
    es: `
      fragment FooterFragment on Footer {
        copyright_es
      }
    `,
  },
  posts: {
    en: `
      fragment PostsFragment on Posts {
        title
        content
        excerpt
        slug
      }
    `,
    es: `
      fragment PostsFragment on Posts {
        title_es
        content_es
        excerpt_es
        slug_es
      }
    `,
  },
  homePosts: {
    en: `
      fragment HomePostsFragment on Posts {
        title
        excerpt
        slug
      }
    `,
    es: `
      fragment HomePostsFragment on Posts {
        title_es
        excerpt_es
        slug_es
      }
    `,
  },
  services: {
    en: `
      fragment ServicesFragment on Services {
        name
        description
      }
    `,
    es: `
      fragment ServicesFragment on Services {
        name_es
        description_es
      }
    `,
  },
  members: {
    en: `
      fragment MembersFragment on Members {
        role
        experience
        achievements {
          id
          achievement
				}
      }
    `,
    es: `
      fragment MembersFragment on Members {
        role_es
        experience_es
        achievements_es {
          id
          achievement
				}
      }
    `,
  },
  maintenance: {
    en: `
      fragment MaintenanceFragment on Maintenance {
        description
      }
    `,
    es: `
      fragment MaintenanceFragment on Maintenance {
        description_es
      }
    `,
  },
  pageContent: {
    en: `
      fragment PageContentFragment on Pages {
        name
        content
      }
    `,
    es: `
      fragment PageContentFragment on Pages {
        name_es
        content_es
      }
    `,
  },
}

export default queryFragments
