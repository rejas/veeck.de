customElements.define('github-card', class extends HTMLElement {

    constructor() {
        super(); // always call super() first in the ctor.
        // Create shadow DOM for the component.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }

                .user {
                    font-family: "Helvetica", Arial, sans-serif;
                    display: inline-block;
                    width: 265px;
                    height: 300px;
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
                    background: #fff url('webcomponent/github.png') no-repeat 5px 5px;
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
                    background: url('webcomponent/spinner.gif') no-repeat center center;
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

    getUser () {
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

    fillUser (user) {
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
