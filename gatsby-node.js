/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      // Name of the field you are adding
      name: 'slug',
      // Individual MDX node
      node,
      // Keep base path value
      value,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const mdxPage = path.resolve(`./src/templates/mdxPage.jsx`);

  // Create pages from mdx data
  const mdxResult = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  if (mdxResult.errors) {
    reporter.panicOnBuild('🚨ERROR: Loading "createPages" query');
    return;
  }

  const posts = mdxResult.data.allMdx.edges;
  posts.forEach((post) => {
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: post.fields.slug,
      // This component will wrap our MDX content
      component: mdxPage,
      // You can use the values in this context in
      // our page layout component
      context: { id: post.id },
    });
  });

  // Create pages from yaml data
  const yamlResult = await graphql(`
    query {
      allPhotosYaml {
        edges {
          node {
            id
            path
          }
        }
      }
    }
  `);
  if (yamlResult.errors) {
    reporter.panicOnBuild('🚨ERROR: Loading "createPages" query');
  }

  const galleries = yamlResult.data.allPhotosYaml.edges;
  galleries.forEach(({ node }) => {
    actions.createPage({
      path: '/photos/' + node.path,
      component: path.resolve(`./src/templates/galleryPage.jsx`),
      context: { id: node.id },
    });
  });
};
