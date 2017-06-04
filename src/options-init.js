import OptSync from 'webext-options-sync';

const opts = new OptSync();

opts.define({
	defaults: {
		starredRepos: 'group',
		forkedRepos: 'group',
		newRepos: 'group',
		comments: 'group',
		newIssues: 'group',
		hideCollaborators: true,
		hideBranches: true,
		hideTags: true,
		hideCommits: true,
		hideClosedIssues: true,
		cookies: null,
		preloadPagesCount: 1
	},
	migrations: [
		OptSync.migrations.removeUnused
	],
});

function saveCookies() {
	chrome.cookies.getAll(
		{url: 'https://github.com'},
		data => opts.set({cookies: serializeCookies(data)})
	);
}

function serializeCookies(data) {
	return JSON.stringify(data
		.reduce((res, {name, value}) => Object.assign(res, {[name]: value}), {}));
}

chrome.cookies.onChanged.addListener(saveCookies);
setTimeout(saveCookies, 10);

