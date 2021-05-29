class GithubCard extends HTMLElement {

    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <style>
                :host {
                    --ghc-primarycolor: #222;
                    --ghc-secondarycolor: #fff;
                    --ghc-textcolor: #999;
                    --ghc-fontfamily: Helvetica, Arial;
                    --ghc-fontsize: 1rem;
                }

                .user {
                    font-family: var(--ghc-fontfamily), sans-serif;
                    font-size: var(--ghc-fontsize);
                    display: flex;
                    flex-flow: column;
                    min-width: 250px;
                    border: 1px solid var(--ghc-primarycolor);
                    border-radius: 6px;
                    position: relative;
                    text-align: center;
                    color: var(--ghc-secondarycolor);
                    transition: background 1000ms ease-out;
                    background: linear-gradient(to bottom, white 0%, white 5rem, var(--ghc-primarycolor) 5rem, var(--ghc-primarycolor) 100%);
                }

                .user dl,
                .user dd {
                    margin: 0;
                }

                .user dt {
                    display: none;
                }

                .user-data {
                    background: var(--ghc-secondarycolor) url('data:image/svg+xml;utf8,<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>') no-repeat 0.25rem 0.25rem;
                    background-color: transparent;
                    background-size: 1.5rem;
                }

                .user-avatar {
                    padding: 1rem 0;
                }

                .user-avatar img {
                    height: 7rem;
                    width: 7rem;
                    border: 3px solid var(--ghc-secondarycolor);
                    border-radius: 100%;
                }

                .user-name,
                .user-account {
                    margin: 0 0 0.5rem;
                }

                .user-name {
                    font-size: 1.5rem;
                    padding-bottom: 0.5rem;
                }

                .user-account {
                    color: var(--ghc-textcolor);
                    font-size: 1rem;
                    padding-bottom: 1rem;
                }

                .user-stats {
                    padding: 0.5rem 2rem;
                    border-top: 1px groove var(--ghc-textcolor);
                    display: flex;
                }

                .user-repos,
                .user-followers {
                    color: var(--ghc-textcolor);
                    display: inline-block;
                    font-size: 1.25rem;
                }

                .user-repos::after,
                .user-followers::after {
                    content: attr(data-stats);
                    text-transform: uppercase;
                    color: var(--ghc-textcolor);
                    display: block;
                    font-size: 0.625rem;
                    line-height: 1.25rem;
                }

                .spinner {
                    background: var(--ghc-primarycolor) url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2Utb3BhY2l0eT0iLjUiIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIvPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGZyb209IjAgMTggMTgiIHRvPSIzNjAgMTggMTgiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+PC9wYXRoPjwvZz48L3N2Zz4=) no-repeat center center;
                }

                .user-github-url,
                .user-repos-url,
                .user-followers-url {
                    text-decoration: none;
                    flex-basis: 50%;
                }
            </style>

            <article class="user spinner">
                <dl class="user-data">
                    <dt>Avatar:</dt>
                    <dd class="user-avatar">
                        <img src="" alt="User avatar">
                    </dd>

                    <dt>Fullname:</dt>
                    <dd class="user-name"></dd>

                    <dt>Account:</dt>
                    <a class="user-github-url">
                        <dd class="user-account"></dd>
                    </a>
                </dl>
                <dl class="user-stats">
                    <dt>Repos:</dt>
                    <a class="user-repos-url">
                        <dd class="user-repos" data-stats="repos"></dd>
                    </a>

                    <dt>Followers:</dt>
                    <a class="user-followers-url">
                        <dd class="user-followers" data-stats="followers"></dd>
                    </a>
                </dl>
            </article>
        `;
    }

    connectedCallback() {
        this.getUser();
    }

    disconnectedCallback() {
    }

    getUser() {
        const url = 'https://api.github.com/users/';
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url + this.getAttribute('user'));
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.DONE) {
                const status = xhr.status;
                if ((status >= 200 && status < 300) || status === 304 || status === 0) {
                    const response = JSON.parse(xhr.response || xhr.responseText);
                    this.fillUser(response);
                }
            }
        };

        xhr.send();
    }

    fillUser(user) {
        const usr = this.shadowRoot;

        usr.querySelector('.user-account').textContent = this.getAttribute('user');

        usr.querySelector('.user-name').textContent = user.name;
        usr.querySelector('.user-avatar img').src = user.avatar_url;
        usr.querySelector('.user-repos').textContent = user.public_repos;
        usr.querySelector('.user-followers').textContent = user.followers;

        usr.querySelector('.user').classList.remove('spinner');
        usr.querySelector('.user-data').removeAttribute('hidden');
        usr.querySelector('.user-stats').removeAttribute('hidden');

        usr.querySelector('.user-github-url').href = user.html_url;
        usr.querySelector('.user-repos-url').href = user.html_url.concat('?tab=repositories');
        usr.querySelector('.user-followers-url').href = user.html_url.concat('/followers');
    }
}

//customElements.define('github-card', GithubCard);

module.exports = {
  GithubCard
};
