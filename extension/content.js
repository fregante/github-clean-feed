/* globals OptMan, ObjectMap */

const iconStar = '<svg aria-label="Stars" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>';
const iconFork = '<svg aria-label="Fork" class="octicon octicon-git-branch" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="14"><path d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>';
const iconRepo = '<svg aria-label="Repository" class="octicon octicon-repo repo-icon" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="14"><path d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>';
const iconIssue = '<svg aria-label="Issue" class="octicon octicon-issue-opened" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>';
const iconPR = '<svg aria-label="Pull request" class="octicon octicon-git-pull-request" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="14"><path d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>';
const iconComment = '<svg aria-label="Issue comment" class="octicon octicon-comment-discussion" height="14" role="img" version="1.1" viewBox="0 0 16 16" width="14"><path d="M15 1H6c-.55 0-1 .45-1 1v2H1c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h1v3l3-3h4c.55 0 1-.45 1-1V9h1l3 3V9h1c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zM9 11H4.5L3 12.5V11H1V5h4v3c0 .55.45 1 1 1h3v2zm6-3h-2v1.5L11.5 8H6V2h9v6z"></path></svg>';

const icons = {
	star: iconStar,
	fork: iconFork,
	create: iconRepo,
	comment: iconComment,
	issue: iconIssue,
	pr: iconPR,
};

function mapFromValues(arrayLike) {
	return Array.from(arrayLike).reduce((list, cls) => {
		list[cls] = true;
		return list;
	}, {});
}

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

function apply(options, insertionPoint) {
	console.log('Updating');
	const holder = fromHTML('<div class="ghgn-holder"><i>');

	const originalEvents = $$('.alert.create', '.octicon-repo').and('.alert:-webkit-any(.watch_started,.public,.fork,.issues_comment,.commit_comment,.issues_opened)');

	const map = originalEvents.reduce((repos, originalEvent) => {
		const actorEl = originalEvent.querySelector('.title a:first-child');
		const eventEl = originalEvent.querySelector('.title a:nth-child(2)');
		const repo = eventEl.textContent.replace(/[#@].*/, '');
		const repoEl = fromHTML(`<a href="/${repo}"></a>`);
		const classes = mapFromValues(originalEvent.classList);
		let type;
		let relatedEl;
		if (classes.watch_started) {
			type = 'star';
		} else if (classes.fork) {
			type = 'fork';
			relatedEl = originalEvent.querySelector('.title a:last-child');
		} else if (classes.create || classes.public) {
			type = 'create';
		} else if (classes.issues_comment || classes.commit_comment || classes.issues_opened) {
			type = 'comment';
			relatedEl = originalEvent.querySelector('blockquote');
		} else {
			console.info(classes);
		}

		const event = {
			type,
			actorEl,
			repoEl,
			eventEl,
			relatedEl,
			timeEl: originalEvent.querySelector('.time'),
		};
		repos[repo] = repos[repo] || new Set();
		repos[repo].add(event);
		originalEvent.remove();
		return repos;
	}, new ObjectMap());

	map.forEach((events, repoUrl) => {
		const [owner, repo] = repoUrl.split('/');
		const repoEventsEl = fromHTML(`<div class="alert">`);
		const repoEventsListEl = fromHTML(`<div class="body">`);
		Array.from(events).forEach((event, i) => {
			let el;
			if (i === 0) {
				el = fromHTML(`
					<div class="simple">
						${icons[event.type]}
						<div class="title">
						</div>
					</div>
				`);
				event.repoEl.textContent = '';
				event.repoEl.appendChild(fromHTML(`${owner}/<strong>${repo}</strong>`, true));
				el.querySelector('.title').appendChild(event.repoEl);
				repoEventsListEl.appendChild(el);
			}

			if (events.size > 1) {
				el = fromHTML(`
					<div class="simple">
						${icons[event.type] ? icons[event.type] : ''}
						<div class="title">
						</div>
					</div>
				`);
			}
			const detailsEl = fromHTML(`<span class="ghgn-details">`);
			switch (event.type) {
				case 'fork':
					detailsEl.textContent = ' to ';
					detailsEl.appendChild(event.relatedEl);
					break;
				case 'create':
					detailsEl.textContent = ' created';
					break;
				case 'comment':
					event.eventEl.textContent = event.eventEl.textContent.replace(/[^#]+/, '');
					detailsEl.appendChild(document.createTextNode(' '));
					detailsEl.appendChild(event.eventEl);
					detailsEl.appendChild(document.createTextNode(' by '));
					detailsEl.appendChild(event.actorEl);
					detailsEl.appendChild(document.createTextNode(': '));
					detailsEl.appendChild(event.relatedEl);
					break;
				default:
					detailsEl.textContent = ' by ';
					detailsEl.appendChild(event.actorEl);
					break;
			}

			detailsEl.appendChild(document.createTextNode(' '));
			detailsEl.appendChild(event.timeEl);
			el.querySelector('.title').appendChild(detailsEl);
			repoEventsListEl.appendChild(el);
		});
		try {
			if (events.size > 1) {
				const icon = repoEventsListEl.querySelector('svg');
				icon.parentNode.replaceChild(fromHTML(iconRepo), icon);
			}
			repoEventsListEl.querySelector('svg').classList.add('dashboard-event-icon');
		} catch (err) {
			console.error(err);
		}
		repoEventsEl.appendChild(repoEventsListEl);
		holder.appendChild(repoEventsEl);
	});

	if (holder.children.length > 0) {
		if (!insertionPoint) {
			const newsFeed = $('#dashboard .news');
			const accountSwitcher = $('.account-switcher');
			insertionPoint = newsFeed.children[accountSwitcher ? 1 : 0];
		}
		insertionPoint.parentNode.insertBefore(holder, insertionPoint);
	}
}

function init(options) {
	const newsFeed = $('#dashboard .news');
	apply(options);

	// track future updates
	const observer = new MutationObserver(([{addedNodes}]) => {
		observer.disconnect(); // disable to prevent loops
		apply(options, addedNodes[0]);// add boxes before the first new element
		observer.observe(newsFeed, {childList: true});
	});
	observer.observe(newsFeed, {childList: true});

	// try loading more
	if (options.loadMore) {
		const btn = $('.ajax-pagination-btn');
		if (btn) {
			// GH might not be ready yet,
			// so don't risk submitting a non-ajaxed form.
			const preventDefault = e => e.preventDefault();
			btn.form.addEventListener('submit', preventDefault);
			btn.click();
			btn.form.removeEventListener('submit', preventDefault);
		}
	}
}
new OptMan().get(init);
