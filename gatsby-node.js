/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
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
