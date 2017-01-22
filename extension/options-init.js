/* globals OptSync */
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
	},
	migrations: [
		OptSync.migrationRemoveUnused
	],
});
