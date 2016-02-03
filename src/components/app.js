'use strict';
import find from 'lodash.find';
import React from 'react';
import classNames from 'classnames';
import data from '../data';

const MAX_FILE_SIZE = 10485760; // 10MB
const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').content;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      exhibit: data[0].id,
      work: data[0].works[0].id,
      checked: false,
      status: 'entry'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(target, evt) {
    if (target === 'work') {
      this.fileExists();
    }

    this.setState({[`${target}`]: evt.target.value});
  }
  fileExists() {
    fetch('./fileList.php', {
      method: 'get',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-TOKEN': CSRF_TOKEN
      }
    })
      .then(resp => resp.json())
      .then(files => {
        const isExists = files.includes(`${this.state.work}.zip`);

        if (isExists) {
          return this.setState({status: 'done'});
        }

        this.setState({status: 'entry'});
      });
  }
  handleCheck(evt) {
    this.setState({checked: evt.target.checked});
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const input = form.querySelector('input[type="file"]');
    const upfile = input.files[0];
    const isOverloaded = upfile.size > MAX_FILE_SIZE;
    const isZip = upfile.type === 'application/zip';

    if (isOverloaded) {
      console.log('file size is too large');
      this.setState({status: 'error'});
      return;
    }
    if (!isZip) {
      console.log('file type isn\'t zip');
      this.setState({status: 'error'});
      return;
    }

    const formData = new FormData();
    formData.append('id', this.state.work);
    formData.append('upfile', upfile);

    fetch(form.action, {
      method: form.method,
      credentials: 'same-origin',
      headers: {
        'X-CSRF-TOKEN': CSRF_TOKEN
      },
      body: formData
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp;
        }

        const err = new Error(resp.statusText);
        err.response = resp;
        throw err;
      })
      .then(() => {
        input.value = '';

        this.setState({
          status: 'done',
          checked: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({status: 'error'});
      });
  }
  componentDidMount() {
    this.fileExists();
  }
  render() {
    const {data, exhibit, work, checked, status} = this.state;
    const exhibitData = find(data, {id: exhibit});
    const exhibitName = exhibitData.name;
    const workData = exhibitData.works;
    // const workName = find(workData, {id: work}).name;
    const workName = (find(workData, {id: work}) || {}).name;
    const isEntry = status === 'entry';
    const hasDone = status === 'done';
    const hasFaild = status === 'error';
    const classes = {
      mt3em: true,
      'is-hidden': hasDone
    };

    return (
      <div className='container'>
        <h1>ECC EXPO 2016 選考作品アップローダー</h1>
        <p className='lead'>手順に沿ってファイルの登録を行ってください。</p>

        <form
          action='./upload.php'
          method='post'
          onSubmit={isEntry && this.handleSubmit}>
          <dl className='form mt3em'>
            <dt>
              <h2>部門を選択してください</h2>
            </dt>
            <dd>
              <select
                className='select'
                value={exhibit}
                onChange={this.handleChange.bind(this, 'exhibit')}
                required>
                {data.map(datum =>
                  <option
                    key={datum.id}
                    value={datum.id}>{datum.name}</option>
                )}
              </select>
            </dd>
          </dl>

          <dl className='form mt3em'>
            <dt>
              <h2>作品を選択してください</h2>
            </dt>
            <dd>
              <select
                className='select'
                value={work}
                onChange={this.handleChange.bind(this, 'work')}
                required>
                {workData.map(work =>
                  <option
                    key={work.id}
                    value={work.id}>{work.name}</option>
                )}
              </select>
            </dd>
          </dl>

          <div className='mt3em'>
            <h2>登録方法の説明</h2>
            <p className='lead'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              <a className='btn btn-block' href='#' download>
                Download Template Data
              </a>
            </p>
          </div>

          <div className={classNames(classes)}>
            <h2>ファイルをアップロード</h2>
            <p>
              <input
                type='file'
                required />
            </p>
            <div className='form-checkbox mt3em'>
              <label>
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={this.handleCheck}
                  required />
                  {exhibitName}部門の
                  <mark>{workName}</mark>
                  としてファイルを登録します。
              </label>
              <p className='note'>
                確実に自分の作品を選択しているか確認してください。
              </p>
            </div>
            <div className='form-actions'>
              <button
                className='btn btn-primary'
                type='submit'>
                Upload
              </button>
              {hasFaild && (
                <p className='text-right text-closed'>
                  アップロードに失敗しました。
                  {' '}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
