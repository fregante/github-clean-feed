/* globals OptMan */
new OptMan().init({
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
		options => {
			if (typeof options.actors === 'string') {
				options.actorsOnHover = options.actors !== 'Always';
				delete options.actors;
			}
		},
		options => {
			for (const name of Object.keys(options)) {
				if (options[name] === 'groupSidebar') {
					options[name] = 'group';
				}
			}
		},
	],
});
