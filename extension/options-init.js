/* globals OptMan */
new OptMan().init({
	defaults: {
		starredRepos: 'group',
		forkedRepos: 'group',
		newRepos: 'group',
		actorsOnHover: true,
		collaborators: true,
		branches: true,
		tags: true,
		commits: true,
		loadMore: true,
		avoidDuplicates: true,
	},
	migratons: [
		options => {
			if (typeof options.actors === 'string') {
				options.actorsOnHover = options.actors !== 'Always';
				delete options.actors;
			}
		},
	],
});
