import OptSync from 'webext-options-sync';
import OptDom from '../../libs/optdom';

const form = OptDom.join(
	OptDom.title('Starred repositories'),
	OptDom.radio('starredRepos', {
		group: 'Group',
		hide: 'Hide',
		off: 'Do nothing',
	}, {
		className: 'one-line'
	}),

	OptDom.title('Forked repositories'),
	OptDom.radio('forkedRepos', {
		group: 'Group',
		hide: 'Hide',
		off: 'Do nothing',
	}, {
		className: 'one-line'
	}),

	OptDom.title('New and newly-public repositories'),
	OptDom.radio('newRepos', {
		group: 'Group',
		hide: 'Hide',
		off: 'Do nothing',
	}, {
		className: 'one-line'
	}),

	OptDom.title('New comments'),
	OptDom.radio('comments', {
		group: 'Group',
		hide: 'Hide',
		off: 'Do nothing',
	}, {
		className: 'one-line'
	}),

	OptDom.title('New issues and PRs'),
	OptDom.radio('newIssues', {
		group: 'Group',
		hide: 'Hide',
		off: 'Do nothing',
	}, {
		className: 'one-line'
	}),

	OptDom.title('Display'),
	OptDom.checkbox('hideCollaborators', 'Hide <em>collaborator added</em> events'),
	OptDom.checkbox('hideBranches', 'Hide <em>new</em> and <em>deleted</em> branches'),
	OptDom.checkbox('hideTags', 'Hide <em>releases</em> and <em>tags</em>'),
	OptDom.checkbox('hideCommits', 'Hide pushed commits'),
	OptDom.checkbox('hideClosedIssues', 'Hide closed issues'),
	''
);

document.querySelector('#options-form').appendChild(form);

new OptSync().syncForm(form);

// chrome.storage.onChanged.addListener(changes => {
// 	const fields = {};
// 	for (const name of Object.keys(changes)) {
// 		fields[name] = changes[name].newValue;
// 	}
// 	updateInputs(fields);
// });
