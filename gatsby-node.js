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

  const mdxTemplate = path.resolve(`./src/components/layout/layout.jsx`);
  const mdxResult = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);
  if (mdxResult.errors) {
    reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query for mdx');
    return;
  }
  const mdxNodes = mdxResult.data.allMdx.nodes;
  mdxNodes.forEach((node) => {
    createPage({
      path: node.frontmatter.slug,
      component: `${mdxTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    });
  });

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
    reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query for yaml');
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
