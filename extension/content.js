var news = document.querySelector('.news');
var fromHTMLHelper = document.createElement('div');
function fromHTML(html, all) {
	fromHTMLHelper.innerHTML = html;
	if (all) {
		all = document.createDocumentFragment();
		Array.from(fromHTMLHelper.childNodes).map(all.appendChild, all);
		return all;
	}
	return fromHTMLHelper.firstElementChild;
}
function usersHTML(users) {
	return Array.from(users)
	.map(user => `<a href="/${user}" style="color:inherit">${user}</a>`)
	.join(', ');
}
function prependChild(parent, child) {
	parent.insertBefore(child, parent.firstChild);
}
function groupRepos(selector, title) {
	var events = Array.from(document.querySelectorAll(selector));
	var map = events.reduce((repos, item) => {
		const user = item.querySelector('.title a:nth-child(1)').textContent;
		const repo = item.querySelector('.title a:nth-child(2)').textContent;
		if (!repos.has(repo)) {
			repos.set(repo, new Set());
		}
		repos.get(repo).add(user);
		return repos;
	}, new Map());
	if (map.size) {
		var groupEl = fromHTML(`
			<div class="boxed-group flush">
				<h3>${title}</h3>
				<ul class="boxed-group-inner mini-repo-list"></ul>
			</div>`);
		var listEl = groupEl.querySelector('.mini-repo-list');
		map.forEach((users, repoUrl) => {
			const [owner, repo] = repoUrl.split('/');
			listEl.appendChild(fromHTML(`
				<li class="public source ">
					<div class="mini-repo-list-item">
						<a href="/${repoUrl}" class="css-truncate">
							<svg aria-label="Repository" class="octicon octicon-repo repo-icon" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
						<span class="repo-and-owner">
							<span class="owner">${owner}</span>/<span class="repo">${repo}</span>
						</span>
					</a>
					${usersHTML(users)}
				</div>
			</li>`));
		});
		prependChild(news, groupEl);
		events.forEach(event => event.remove());
	}
}

function init() {
	groupRepos('.alert.fork', 'Forked repositories');
	groupRepos('.watch_started', 'Starred repositories');
	var accountSwitcher = document.querySelector('.account-switcher');
	if (accountSwitcher) {
		prependChild(news, accountSwitcher);
	}
}

init();
