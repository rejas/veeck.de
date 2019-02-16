customElements.define('github-card', class extends HTMLElement {

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }

                .user {
                    font-family: "Helvetica", Arial, sans-serif;
                    display: inline-block;
                    width: 265px;
                    height: 320px;
                    overflow: hidden;
                    border-radius: 6px;
                    position: relative;
                    background-color: #2e353c;
                    text-align: center;
                    color: #fff;
                    font-weight: 100;
                    transition: background 1000ms ease-out;
                }

                .user dl,
                .user dd {
                    margin: 0;
                }

                .user dt {
                    display: none;
                }

                .user-data {
                    background: #fff url('data:image/svg+xml;utf8,<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>') no-repeat 5px 5px;
                    background-size: 25px;
                    height: 85px;
                    border: 1px solid #d5d5d5;
                    border-bottom: 0;
                }

                dd.user-avatar {
                    display: inline-block;
                    margin: 20px 0 10px;
                }

                .user-avatar img {
                    border-radius: 100%;
                    height: 120px;
                    width: 120px;
                    border: 3px solid #fff;
                    vertical-align: middle;
                    background-color: #fff;
                }

                dd.user-name,
                dd.user-account {
                    margin: 5px 0;
                }

                .user-name {
                    font-size: 24px;
                }

                .user-account {
                    font-size: 16px;
                    color: #999;
                    margin: 5px 0;
                }

                .user-stats {
                    border-top: 1px groove #999;
                    position: relative;
                    top: 155px;
                }

                .user-stats dd {
                    padding: 10px 20px;
                }

                .user-repos,
                .user-followers {
                    display: inline-block;
                    font-size: 22px;
                    color: #999;
                }

                .user-repos::after,
                .user-followers::after {
                    content: attr(data-stats);
                    text-transform: uppercase;
                    display: block;
                    font-size: 11px;
                    color: #666;
                    font-weight: normal;
                    line-height: 1.7em;
                }

                .spinner {
                    background: #2e353c url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2Utb3BhY2l0eT0iLjUiIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIvPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGZyb209IjAgMTggMTgiIHRvPSIzNjAgMTggMTgiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+PC9wYXRoPjwvZz48L3N2Zz4=) no-repeat center center;
                }

                a.user-github-url,
                a.user-repos-url,
                a.user-followers-url {
                    text-decoration: none;
                }
            </style>

            <article class="user spinner">
                <dl class="user-data" hidden>
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
                <dl class="user-stats" hidden>
                    <dt>Repos</dt>
                    <a class="user-repos-url">
                        <dd class="user-repos" data-stats="repos"></dd>
                    </a>

                    <dt>Followers</dt>
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
});
