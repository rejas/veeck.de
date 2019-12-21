/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    actions.createNodeField({
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
  const result = await graphql(`
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
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const posts = result.data.allMdx.edges;
  posts.forEach(({ node }, index) => {
    actions.createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/mdxPage.jsx`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });

  const result2 = await graphql(`
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
  if (result2.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const galleries = result2.data.allPhotosYaml.edges;
  galleries.forEach(element => {
    actions.createPage({
      path: '/photos/' + element.node.path,
      component: path.resolve(`./src/templates/galleryPage.jsx`),
      context: { id: element.node.id },
    });
  });
};
