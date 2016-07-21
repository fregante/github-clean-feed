/* global OptMan */
const options = new OptMan();
options.createForm(
	OptMan.title('List users who starred, forked, ... the repos'),
	OptMan.radio('actors', {
		always: 'Always',
		hover: 'When hovering the icon',
		none: 'No',
	}, {
		oneLine: true,
	}),

	OptMan.title('Starred repositories'),
	OptMan.radio('starredRepos', {
		group: 'Grouped',
		groupSidebar: 'Grouped in sidebar',
		hide: 'Hidden',
		off: 'Untouched',
	}, {
		oneLine: true,
	}),

	OptMan.title('Forked repositories'),
	OptMan.radio('forkedRepos', {
		group: 'Grouped',
		groupSidebar: 'Grouped in sidebar',
		hide: 'Hidden',
		off: 'Untouched',
	}, {
		oneLine: true,
	}),

	OptMan.title('New and newly-public repositories'),
	OptMan.radio('newRepos', {
		group: 'Grouped',
		groupSidebar: 'Grouped in sidebar',
		hide: 'Hidden',
		off: 'Untouched',
	}, {
		oneLine: true,
	}),

	OptMan.title('Utilities'),
	OptMan.checkbox('collaborators', 'Hide <em>collaborator added</em> events'),
	OptMan.checkbox('branches', 'Hide <em>new</em> and <em>deleted</em> branches'),
	OptMan.checkbox('commits', 'Hide pushed commits'),
	OptMan.checkbox('tags', 'Hide <em>releases</em> and <em>tags</em>'),
	OptMan.checkbox('loadMore', 'Load one more page automatically'),
	''
);

document.querySelector('#options-form').appendChild(options.form);

