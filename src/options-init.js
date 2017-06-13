import OptSync from 'webext-options-sync';

new OptSync().define({
	defaults: {
		starredRepos: 'group',
		forkedRepos: 'group',
		newRepos: 'group',
		comments: 'group',
		newIssues: 'group',
		collaborators: 'hide',
		branches: 'hide',
		tags: 'hide',
		commits: 'hide',
		closedIssues: 'hide',
		preloadPagesCount: 0
	},
	migrations: [
		savedOptions => {
			if (savedOptions.hideCollaborators) {
				savedOptions.collaborators = 'hide';
			}
			if (savedOptions.hideBranches) {
				savedOptions.branches = 'hide';
			}
			if (savedOptions.hideTags) {
				savedOptions.tags = 'hide';
			}
			if (savedOptions.hideCommits) {
				savedOptions.commits = 'hide';
			}
			if (savedOptions.hideClosedIssues) {
				savedOptions.closedIssues = 'hide';
			}
			delete savedOptions.hideCollaborators;
			delete savedOptions.hideBranches;
			delete savedOptions.hideTags;
			delete savedOptions.hideCommits;
			delete savedOptions.hideClosedIssues;
		},
		OptSync.migrations.removeUnused
	],
});
