/* globals OptMan */

const iconStar = '<svg aria-label="Stars" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>';
const iconFork = '<svg aria-label="Fork" class="octicon octicon-git-branch dashboard-event-icon" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="10"><path d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>';
const iconRepo = '<svg aria-label="Repository" class="octicon octicon-repo repo-icon" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>';

const $ = selector => document.querySelector(selector);
const $$ = (selector, has) => {
	let elements = Array.from(document.querySelectorAll(selector));
	if (has) {
		elements = elements.filter(el => el.querySelector(has));
	}
	elements.and = function () {
		elements.splice(0, 0, ...$$(...arguments));
		return elements;
	};
	return elements;
};

function fromHTML(html, all) {
	const helper = document.createElement('div');
	helper.innerHTML = html;
	if (all) {
		all = document.createDocumentFragment();
		Array.from(helper.childNodes).map(all.appendChild, all);
		return all;
	}
	return helper.firstElementChild;
}

function actorsHTML(actors) {
	return Array.from(actors).map(user => `<a href="/${user}">${user}</a>`).join(', ');
}

function runAction({action, elements, title, holder, actorsOnHover, icon = '', avoidDuplicates}) {
	if (action === 'off') {
		return;
	}
	if (action === 'hide') {
		elements.forEach(elements => elements.remove());
		return;
	}

	const map = elements.reduce((repos, item) => {
		const user = item.querySelector('.title a:nth-child(1)').textContent;
		const repo = item.querySelector('.title a:nth-child(2)').textContent;
		if (!repos.has(repo)) {
			repos.set(repo, new Set());
		}
		repos.get(repo).add(user);
		return repos;
	}, new Map());

	if (!map.size) {
		return;
	}
	const groupEl = fromHTML(`<div class="boxed-group flush ghgn-group"><h3>${title}</h3></div>`);
	const listEl = fromHTML('<ul class="boxed-group-inner mini-repo-list"></ul>');

	map.forEach((actors, repoUrl) => {
		if (avoidDuplicates && $(`.ghgn-group a[href="/${repoUrl}"]`)) {
			return;
		}
		const [owner, repo] = repoUrl.split('/');
		listEl.appendChild(fromHTML(`
			<li class="public source ghgn-actors-${actorsOnHover ? 'hover' : 'always'}">
				<div class="mini-repo-list-item">
					<a href="/${repoUrl}" class="css-truncate">
						${iconRepo}
						<span class="repo-and-owner css-truncate-target">
							<span class="owner css-truncate-target">${owner}</span>/<span class="repo">${repo}</span>
						</span>
					</a>
					<span class="stars ghgn-stars">
						${actors.size > 1 ? actors.size : ''}
						${icon}
					</span>
					<span class="ghgn-actors">${actorsHTML(actors)}</span>
				</div>
			</li>
		`));
	});

	if (listEl.children.length) {
		groupEl.appendChild(listEl);
		holder.appendChild(groupEl);
	}
	elements.forEach(element => element.remove());
}

function apply(options) {
	const holder = fromHTML('<div class="ghgn-holder">');
	const {avoidDuplicates, actorsOnHover} = options;

	// handle stars
	runAction({
		action: options.starredRepos,
		elements: $$('.alert.watch_started'),
		title: 'Starred repositories',
		icon: iconStar,
		actorsOnHover,
		avoidDuplicates,
		holder,
	});

	// handle forks
	runAction({
		action: options.forkedRepos,
		elements: $$('.alert.fork'),
		title: 'Forked repositories',
		icon: iconFork,
		actorsOnHover,
		avoidDuplicates,
		holder,
	});

	// new/public repos
	runAction({
		action: options.newRepos,
		elements: $$('.alert.create', '.octicon-repo').and('.alert.public'),
		title: 'New repositories',
		actorsOnHover,
		avoidDuplicates,
		holder,
	});

	// possibly hide new/deleted branches
	runAction({
		action: options.branches ? 'hide' : 'off',
		elements: $$('.alert.create', '.octicon-git-branch').and('.alert.delete'),
	});

	// possibly hide tags and releases
	runAction({
		action: options.tags ? 'hide' : 'off',
		elements: $$('.alert.create', '.octicon-tag').and('.alert.release'),
	});

	// possibly hide pushed commits
	runAction({
		action: options.commits ? 'hide' : 'off',
		elements: $$('.alert.push'),
	});

	// possibly hide collaborator events
	runAction({
		action: options.collaborators ? 'hide' : 'off',
		elements: $$('.alert.member_add'),
	});

	if (holder.children.length) {
		const newsFeed = $('#dashboard .news');
		if (options.insertionPoint) {
			newsFeed.insertBefore(holder, options.insertionPoint);
		} else {
			const accountSwitcher = $('.account-switcher');
			newsFeed.insertBefore(holder, newsFeed.children[accountSwitcher ? 1 : 0]);
		}
	}
}

function init(options) {
	const newsFeed = $('#dashboard .news');
	apply(options);

	// track future updates
	const observer = new MutationObserver(([{addedNodes}]) => {
		observer.disconnect(); // disable to prevent loops
		options.insertionPoint = addedNodes[0]; // add boxes before the first new element
		apply(options);
		observer.observe(newsFeed, {childList: true});
	});
	observer.observe(newsFeed, {childList: true});

	// try loading more
	if (options.loadMore) {
		const btn = $('.ajax-pagination-btn');
		if (btn) {
			btn.click();
		}
	}
}
new OptMan().get(init);
