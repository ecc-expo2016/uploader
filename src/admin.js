'use strict';
import 'babel-polyfill';
import 'whatwg-fetch';
import data from './data';

const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').content;

const getFileList = () => {
  return fetch('./fileList.php', {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'X-CSRF-TOKEN': CSRF_TOKEN
    }
  })
    .then(resp => resp.json());
};

const createList = (files, list) => {
  const html = data.map(exhibit => `
    <h2 class="mt3em">${exhibit.name}</h2>
    <table class="admin">
      <tbody>
        ${exhibit.works.map(work => {
          const fileName = `${work.id}.zip`;
          const isExists = files.includes(fileName);

          return `
            <tr>
              <td class="admin-file">
                ${isExists ? `
                  <a class="btn btn-sm" href="./uploads/${fileName}" download>
                    zip
                  </a>
                ` : ''}</td>
              <td class="admin-state">
                ${isExists ? `
                  <span class="state state-open">Done</span>
                ` : `
                  <span class="state state-closed">None</span>
                `}
              </td>
              <td>${work.name}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `).join('');

  list.insertAdjacentHTML('beforeend', html);
};

(async () => {
  const files = await getFileList();
  createList(files, document.querySelector('#list'));
})();
