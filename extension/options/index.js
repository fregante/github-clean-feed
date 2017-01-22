/* global OptMan, OptDom */
const form = OptDom.join(
	OptDom.title('Starred repositories'),
	OptDom.radio('starredRepos', {
		group: 'Grouped',
		hide: 'Hidden',
		off: 'Untouched',
	}),

	OptDom.title('Forked repositories'),
	OptDom.radio('forkedRepos', {
		group: 'Grouped',
		hide: 'Hidden',
		off: 'Untouched',
	}),

	OptDom.title('New and newly-public repositories'),
	OptDom.radio('newRepos', {
		group: 'Grouped',
		hide: 'Hidden',
		off: 'Untouched',
	}),

	OptDom.title('Display'),
	OptDom.checkbox('actorsOnHover', 'Only show usernames when hovering the event icon'),
	OptDom.checkbox('collaborators', 'Hide <em>collaborator added</em> events'),
	OptDom.checkbox('branches', 'Hide <em>new</em> and <em>deleted</em> branches'),
	OptDom.checkbox('tags', 'Hide <em>releases</em> and <em>tags</em>'),
	OptDom.checkbox('commits', 'Hide pushed commits'),

	OptDom.title('Utilities'),
	OptDom.checkbox('loadMore', 'Load one more page automatically'),
	OptDom.checkbox('avoidDuplicates', 'Avoid duplicates across feed pages'),
	''
);

document.querySelector('#options-form').appendChild(form);

new OptMan().syncForm(form);

