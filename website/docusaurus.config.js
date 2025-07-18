/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const semver = require("semver");
const exec = require("child_process").execSync;
const path = require("path");
const crates_llms_txt = require("crates-llms-txt");

const { themes } = require("prism-react-renderer");
const repoAddress = "https://github.com/apache/opendal";

const baseUrl = process.env.OPENDAL_WEBSITE_BASE_URL
  ? process.env.OPENDAL_WEBSITE_BASE_URL
  : "/";
const websiteNotLatest = process.env.OPENDAL_WEBSITE_NOT_LATEST
  ? process.env.OPENDAL_WEBSITE_NOT_LATEST
  : false;
const websiteStaging = process.env.OPENDAL_WEBSITE_STAGING
  ? process.env.OPENDAL_WEBSITE_STAGING
  : false;

const websiteVersion = (function () {
  if (websiteStaging && process.env.GITHUB_REF_TYPE === "tag") {
    const refName = process.env.GITHUB_REF_NAME;
    if (refName.startsWith("v")) {
      const version = semver.parse(refName, {}, true);
      return `${version.major}.${version.minor}.${version.patch}`;
    }
  }

  try {
    const refName = exec(
      "git describe --tags --abbrev=0 --match 'v*' --exclude '*rc*'"
    ).toString();
    const version = semver.parse(refName, {}, true);
    return `${version.major}.${version.minor}.${version.patch}`;
  } catch (error) {
    console.warn("Failed to get version from Git, using default '0.0.0'");
    return "0.0.0";
  }
})();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Apache OpenDAL™",
  tagline:
    "Open Data Access Layer: Access data freely, painlessly, and efficiently",
  favicon: "img/favicon.ico",

  customFields: {
    isStaging: websiteStaging,
    version: websiteVersion,
  },

  url: "https://opendal.apache.org/",
  baseUrl: "/",
  // Always set trailingSlash to true to avoid redirecting to a URL with a trailing slash
  trailingSlash: true,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    format: "detect",
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./docs/sidebars.js"),
          editUrl: "https://github.com/apache/opendal/tree/main/website/",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/apache/opendal/tree/main/website/",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "daily",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "community",
        routeBasePath: "community",
        sidebarPath: require.resolve("./community/sidebars.js"),
        editUrl: "https://github.com/apache/opendal/tree/main/website/",
      },
    ],
    [require.resolve("docusaurus-plugin-image-zoom"), {}],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/docs/vision",
            to: "/vision",
          },
          {
            from: "/discord",
            to: "https://discord.com/invite/XQy8yGR2dg",
          },
          {
            from: "/maillist",
            to: "https://lists.apache.org/list.html?dev@opendal.apache.org",
          },
        ],
      },
    ],
    require.resolve("docusaurus-lunr-search"),
    // This plugin will download all images to local and rewrite the url in html.
    require.resolve("./plugins/image-ssr-plugin"),
    [
      "docusaurus-plugin-llms-builder",
      /** @type {import("docusaurus-plugin-llms-builder").PluginOptions} */
      ({
        version: websiteVersion,
        llmConfigs: [
          {
            title: "Apache OpenDAL™: One Layer, All Storage.",
            description:
              'OpenDAL (/ˈoʊ.pən.dæl/, pronounced "OH-puhn-dal") is an Open Data Access Layer that enables seamless interaction with diverse storage services.',
            summary:
              "OpenDAL's development is guided by its vision of One Layer, All Storage and its core principles: Open Community, Solid Foundation, Fast Access, Object Storage First, and Extensible Architecture. Read the explained vision at OpenDAL Vision.",
            generateLLMsTxt: true,
            generateLLMsFullTxt: true,
            hooks: {
              "generate:prepare": (ctx) => {
                try {
                  // cargo rustdoc all features
                  const config =
                    crates_llms_txt.getLlmsConfigByRustdocAllFeatures(
                      "stable",
                      path.resolve(process.cwd(), "../core/Cargo.toml")
                    );
                  if (!config) return;

                  const linkProcess = (link) => {
                    if (
                      /^https:\/\/docs\.rs([\/\w].*\/[0-9]+.[0-9]+.[0-9]+$)/.test(
                        link
                      )
                    ) {
                      return "https://opendal.apache.org/docs/rust/opendal/";
                    }

                    return link.includes("source/src")
                      ? link.replace(
                          /https:\/\/docs\.rs\/crate\/([^/]+)\/([^/]+)\/source\/src/g,
                          "https://opendal.apache.org/docs/rust/src/opendal"
                        ) + ".html"
                      : link;
                  };

                  if (config.sessions) {
                    const sessions = config.sessions;
                    ctx.llmConfig.llmStdConfig.sessions.unshift({
                      sessionName: config.libName,
                      source: "normal",
                      items: sessions.map((item) => {
                        return {
                          title: item.title,
                          description: item.description,
                          link: linkProcess(item.link),
                        };
                      }),
                    });
                  }

                  if (config.fullSessions) {
                    const fullSessions = config.fullSessions;
                    ctx.llmConfig.llmFullStdConfig.sessions = fullSessions
                      .map((item) => {
                        return {
                          link: linkProcess(item.link),
                          content: item.content,
                        };
                      })
                      .concat(ctx.llmConfig.llmFullStdConfig.sessions);
                  }
                } catch (error) {
                  console.log("QAQ error:", error);
                }
              },
            },
            sessions: [
              {
                type: "docs",
                docsDir: "docs",
                sessionName: "Docs",
                sitemap: "sitemap.xml",
                patterns: {
                  ignorePatterns: ["**/blog/**", "**/blog", "**/community/**"],
                  orderPatterns: (a, b) => {
                    const aPath = new URL(a).pathname;
                    const bPath = new URL(b).pathname;

                    const aSegments = aPath.split("/").filter(Boolean);
                    const bSegments = bPath.split("/").filter(Boolean);

                    if (aSegments.length !== bSegments.length) {
                      return aSegments.length - bSegments.length;
                    }

                    return a.localeCompare(b);
                  },
                },
              },
              {
                type: "blog",
                docsDir: "blog",
                sessionName: "Blog",
                rss: "rss.xml",
              },
              {
                type: "docs",
                docsDir: "community",
                sessionName: "Community",
              },
            ],
          },
        ],
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // TODO social card image
      // image: 'img/opendal-social-card.jpg',
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
      },
      navbar: {
        logo: {
          alt: "Apache OpenDAL",
          src: "img/logo.svg",
          srcDark: "img/logo_dark.svg",
          href: "/",
          target: "_self",
          height: 32,
        },
        items: [
          {
            type: "doc",
            docId: "overview",
            position: "right",
            label: "Docs",
          },
          {
            to: "/blog",
            label: "Blog",
            position: "right",
          },
          {
            type: "doc",
            docId: "community",
            position: "right",
            label: "Community",
            docsPluginId: "community",
          },
          {
            to: "/download",
            label: "Download",
            position: "right",
          },
          {
            type: "dropdown",
            label: "ASF",
            position: "right",
            items: [
              {
                label: "Foundation",
                to: "https://www.apache.org/",
              },
              {
                label: "License",
                to: "https://www.apache.org/licenses/",
              },
              {
                label: "Events",
                to: "https://www.apache.org/events/current-event.html",
              },
              {
                label: "Privacy",
                to: "https://privacy.apache.org/policies/privacy-policy-public.html",
              },
              {
                label: "Security",
                to: "https://www.apache.org/security/",
              },
              {
                label: "Sponsorship",
                to: "https://www.apache.org/foundation/sponsorship.html",
              },
              {
                label: "Thanks",
                to: "https://www.apache.org/foundation/thanks.html",
              },
              {
                label: "Code of Conduct",
                to: "https://www.apache.org/foundation/policies/conduct.html",
              },
            ],
          },
          {
            href: repoAddress,
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
          {
            href: "https://discord.gg/XQy8yGR2dg",
            position: "right",
            className: "header-discord-link",
            "aria-label": "Discord",
          },
        ],
      },
      footer: {
        style: "light",
        logo: {
          alt: "Apache Software Foundation",
          src: "./img/asf_logo_wide.svg",
          href: "https://www.apache.org/",
          width: 300,
        },
        copyright: `Copyright © 2022-${new Date().getFullYear()}, The Apache Software Foundation<br/>Apache OpenDAL, OpenDAL, Apache, the Apache feather and the Apache OpenDAL project logo are either registered trademarks or trademarks of the Apache Software Foundation.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ["rust", "java", "groovy"],
      },
      zoom: {
        selector: "img:not(a img)",
        background: "rgba(255, 255, 255, 0.8)",
        config: {},
      },
    }),
};

function generateConfig() {
  config.baseUrl = baseUrl;

  if (websiteNotLatest) {
    config.themeConfig.announcementBar = {
      id: "announcementBar-0", // Increment on change
      content:
        'You are viewing the documentation of a <strong>historical release</strong>. <a href="https://nightlies.apache.org/opendal/opendal-docs-stable/">View the latest stable release</a>.',
    };
  }

  return config;
}

module.exports = generateConfig();
