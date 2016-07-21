/* globals OptMan */
new OptMan().init({
	defaults: {
		starredRepos: 'group',
		forkedRepos: 'group',
		newRepos: 'group',
		actors: 'hover',
		collaborators: true,
		branches: true,
		tags: true,
		commits: true,
		loadMore: true,
		avoidDuplicates: true,
	},
});
