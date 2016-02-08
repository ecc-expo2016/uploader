// 別のタブでブラウザ開かれたらCSRF TOKENでひっかかるので、ブラウザ再読み込みしてくださいってメッセージ出す

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
    const {value} = evt.target;
    let state = {[`${target}`]: value};

    if (target === 'exhibit') {
      const exhibitData = find(this.state.data, {id: value});

      // state.work = exhibitData.works[0].id;
      state.work = exhibitData.works.length
        ? exhibitData.works[0].id
        : '';
    }

    (async () => {
      state.status = await this.getFileExists(state.work);
      this.setState(state);
    })();
  }
  getFileExists(work = this.state.work) {
    return fetch('./fileList.php', {
      method: 'get',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-TOKEN': CSRF_TOKEN
      }
    })
      .then(resp => resp.json())
      .then(files => {
        const isExists = files.includes(`${work}.zip`);
        return isExists ? 'done' : 'entry';
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
    (async () => {
      const status = await this.getFileExists();
      this.setState({status});
    })();
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
        <h1>
          <img
            src='./img/logo.svg'
            width='270'
            height='28'
            alt='ECC EXPO 2016' />
          {' '}
          選考作品アップローダー
        </h1>
        <p className='lead'>手順に沿ってファイルの登録を行ってください。</p>

        <form
          action='./upload.php'
          method='post'
          onSubmit={isEntry && this.handleSubmit}>
          <div>
            <h2>提出方法について</h2>
            <p>
              入選おめでとうございます。<br />
              入選にあたり、<strong>作品情報</strong>と<strong>３種類の画像</strong>のご提出をお願いします。
            </p>
            <p>
              まず、以下のボタンをクリックしてテンプレートファイルをダウンロードしてください。<br />
              [ template.zip ] というファイルがダウンロードできますので、解凍して中身をご確認ください。
            </p>
            <p>
              <a className='btn btn-block' href='./data/template.zip' download>
                Download Template Data
              </a>
            </p>
            <p>
              フォルダ内には、Excel と psd データが入っています。
            </p>
            <ol>
              <li>
                Excel ファイルに必要な情報が一覧になっているので、それぞれの入力欄に適切な値を入力してください。
              </li>
              <li>
                同 Excel ファイル内に、画像の提出方法について記載しています。<br />
                そちらをご確認の上、画像を作成してください。
              </li>
              <li>
                データが完成したら、フォルダを zip 形式に圧縮し、<strong>部門と作品名を選択の上</strong>、以下のフォームからアップロードしてください。<br />
                部門と作品名が自分のものと一致しているか、必ずご確認ください。
              </li>
            </ol>
          </div>

          <div className='mt3em'>
            <h2>注意事項</h2>
            <ol>
              <li>
                <strong className='text-closed'>ファイルの再アップロードはできません。</strong>ファイルに間違いが無いことを確認してアップロードして下さい。<br />
                もし、ファイル内容に不備があった場合、担任（または担当）の先生に速やかに連絡して下さい。
              </li>
              <li>
                <strong className='text-closed'>締め切り厳守です。</strong>
              </li>
            </ol>
          </div>

          <dl className='mt3em'>
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

          <dl className='mt3em'>
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
