/* global ObjectMap */
import OptSync from 'webext-options-sync';
import eskape from 'eskape';
import domify from '../libs/html-to-dom';
import * as icons from '../libs/github-icons';
import concatSets from '../libs/concatenate-set';
import mapFromValues from '../libs/map-from-values';
import {$, $$} from '../libs/select';

const domifyEscape = (...args) => domify(eskape(...args));

function groupByRepo(events) {
	return Array.from(events).reduce((repos, originalEvent) => {
		const icon = originalEvent.querySelector('svg');
		const actorEl = originalEvent.querySelector('.title a:first-child');
		const eventEl = originalEvent.querySelector('.title a:nth-child(2)');
		const repo = eventEl.textContent.replace(/[#@].*/, '');
		const repoEl = domifyEscape`<a href="/${repo}"></a>`;
		const classes = mapFromValues(originalEvent.classList);
		let type;
		let relatedEl;
		if (classes.watch_started) {
			type = 'star';
		} else if (classes.fork) {
			type = 'fork';
			relatedEl = originalEvent.querySelector('.title a:last-child');
		} else if (classes.create || classes.public) {
			type = 'repo';
		} else if (icon.classList.contains('octicon-git-pull-request')) {
			type = 'pr';
			relatedEl = originalEvent.querySelector('blockquote');
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
}
function apply(options, insertionPoint) {
	const holder = domifyEscape`<div class="ghcf-holder"><i>`;
	const byType = {
		starredRepos: $$('.alert.watch_started'),
		forkedRepos: $$('.alert.fork'),
		newRepos: $$('.alert.create', '.octicon-repo').concat($$('.alert.public')),
		comments: $$('.alert.commit_comment, .alert.issues_comment'),
		newIssues: $$('.alert.issues_opened'),
		hideBranches: $$('.alert.create', '.octicon-git-branch').concat($$('.alert.delete')),
		hideTags: $$('.alert.create', '.octicon-tag').concat($$('.alert.release')),
		hideCommits: $$('.alert.push'),
		hideCollaborators: $$('.alert.member_add'),
		hideClosedIssues: $$('.alert.issues_closed')
	};

	const originalEvents = new Set();

	Object.keys(byType).forEach(type => {
		if (options[type] === 'group') {
			concatSets(originalEvents, byType[type]);
		} else if (options[type] === 'hide' || options[type] === true) {
			byType[type].forEach(el => el.remove());
		}
	});

	groupByRepo(originalEvents).forEach((events, repoUrl) => {
		const [owner, repo] = repoUrl.split('/');
		const repoEventsEl = domifyEscape`<div class="alert">`;
		const repoEventsListEl = domifyEscape`<div class="body">`;

		repoEventsEl.classList.add(`ghcf-repo`);
		repoEventsEl.classList.add(`ghcf-repo-user-${owner}`);
		repoEventsEl.classList.add(`ghcf-repo-name-${repo}`);
		if (events.size === 1) {
			repoEventsEl.classList.add(`ghcf-actor-user-${[...events][0].actorEl.textContent}`);
		}

		Array.from(events).forEach((event, i) => {
			let el;
			if (i === 0) {
				el = domify(`
					<div class="simple">
						${icons[event.type]}
						<div class="title"></div>
					</div>
				`);
				event.repoEl.textContent = '';
				event.repoEl.appendChild(domifyEscape`${owner}/<strong>${repo}</strong>`);
				el.querySelector('.title').appendChild(event.repoEl);
				repoEventsListEl.appendChild(el);
			}

			if (events.size > 1) {
				el = domify(`
					<div class="simple">
						${icons[event.type] ? icons[event.type] : ''}
						<div class="title">
						</div>
					</div>
				`);
			} else {
				el.classList.add(`ghcf-event`);
				el.classList.add(`ghcf-actor-user-${event.actorEl.textContent}`);
			}

			el.classList.add(`ghcf-repo-user-${owner}`);
			el.classList.add(`ghcf-repo-name-${repo}`);

			const detailsEl = domifyEscape`<span class="ghcf-details">`;
			switch (event.type) {
				case 'fork':
					detailsEl.textContent = ' to ';
					detailsEl.appendChild(event.relatedEl);
					break;
				case 'repo':
					detailsEl.textContent = ' created';
					break;
				case 'pr':
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
				icon.parentNode.replaceChild(domify(icons.repo), icon);
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

	const run = (observer, nodes) => {
		apply(options, nodes); // add boxes before the first new element
		setTimeout(() => { // Firefox goes in a loop without this timer
			observer.observe(newsFeed, {childList: true});
		}, 10);
	};

	// track future updates
	const observer = new MutationObserver(([{addedNodes}], observer) => {
		observer.disconnect(); // disable to prevent loops
		run(observer, addedNodes[0]);
	});

	run(observer);
}

const domReady = new Promise(resolve => {
	(function check() {
		if (document.querySelector('.ajax-pagination-form')) {
			resolve();
		} else {
			requestAnimationFrame(check);
		}
	})();
});
const options = new OptSync().getAll();
domReady.then(() => options).then(init);
