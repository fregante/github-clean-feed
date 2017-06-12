import OptSync from 'webext-options-sync';

new OptSync().define({
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
		preloadPagesCount: 1
	},
	migrations: [
		OptSync.migrations.removeUnused
	],
});
