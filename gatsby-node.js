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
  const { createPage } = actions;
  const galleryPage = path.resolve(`./src/templates/galleryPage.jsx`);

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
    reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query');
    return;
  }

  const galleries = yamlResult.data.allPhotosYaml.edges;
  galleries.forEach((gallery) => {
    createPage({
      path: '/photos/' + gallery.node.path,
      component: galleryPage,
      context: { id: gallery.node.id },
    });
  });
};
