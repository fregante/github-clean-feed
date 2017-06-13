import OptSync from 'webext-options-sync';
import domify from '../../libs/html-to-dom';

const i18n = (...args) => chrome.i18n.getMessage(...args);

/**
 * Create form
 */
const table = document.querySelector('.core-table tbody');
for (const [id, i18nId, hideOnly] of [
	['starredRepos', 'starred_repos'],
	['forkedRepos', 'forked_repos'],
	['newRepos', 'new_repos'],
	['comments', 'new_comments'],
	['newIssues', 'new_issues_and_prs'],
	['closedIssues', 'closed_issues', true],
	['collaborators', 'collaborators', true],
	['branches', 'branches', true],
	['tags', 'tags', true],
	['commits', 'commits', true],
]) {
	table.appendChild(domify(`
		<tr>
			<th>${i18n(i18nId)}</th>
			<td>
				<label>
					<input name=${id} type=radio value=group ${hideOnly ? 'disabled' : ''}>
					<span>${i18n('action_group')}</span>
				</label>
			</td>
			<td>
				<label>
					<input name=${id} type=radio value=hide>
					<span>${i18n('action_hide')}</span>
				</label>
			</td>
			<td>
				<label>
					<input name=${id} type=radio value=off>
					<span>${i18n('action_off')}</span>
				</label>
			</td>
		</tr>
	`));
}

/**
 * Localize form
 */
for (const el of document.querySelectorAll('[data-i18n]')) {
	el.innerHTML = i18n(el.dataset.i18n);
}

/**
 * Activate form
 */
new OptSync().syncForm(document.querySelector('#options-form'));

