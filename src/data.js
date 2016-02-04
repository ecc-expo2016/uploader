'use strict';

export default [
  {
    id: 'gamesoftware',
    name: 'ゲームソフト',
    works: [
      {
        id: 'gs01',
        name: 'さくひんめい１'
      }, {
        id: 'gs02',
        name: 'さくひんめい２'
      }, {
        id: 'gs03',
        name: 'さくひんめい３'
      }
    ]
  }, {
    id: 'gameplannning',
    name: 'ゲーム企画',
    works: [
      {
        id: '',
        name: '去斬華'
      }, {
        id: '',
        name: 'チルボット'
      }, {
        id: '',
        name: 'Frowers'
      }, {
        id: '',
        name: '１ week D'
      }, {
        id: '',
        name: '望遠鏡と大きな世界'
      }, {
        id: '',
        name: 'Roll Play！'
      }, {
        id: '',
        name: 'Mr.Phantom in Grasswarld'
      }, {
        id: '',
        name: '人闇'
      }, {
        id: '',
        name: 'メイクサロン　Doll Up'
      }, {
        id: '',
        name: 'Night OF THE DEAD'
      }
    ]
  }, {
    id: '3dillustration',
    name: '3Dイラスト',
    works: [
      {
        id: '',
        name: 'Chrysocolla'
      }, {
        id: '',
        name: '大暴れ！金魚すくい？'
      }, {
        id: '',
        name: 'Mushroom House'
      }, {
        id: '',
        name: '旋廻せし焔の泡'
      }, {
        id: '',
        name: 'VAPORS'
      }, {
        id: '',
        name: 'BMW-i8'
      }
    ]
  }, {
    id: '2dillustration',
    name: '2Dイラスト',
    works: [
      {
        id: '',
        name: '若年騎士アルベール'
      }, {
        id: '',
        name: 'ラフレシアの旅'
      }, {
        id: '',
        name: '天使の日'
      }, {
        id: '',
        name: '煉獄の番人 イフリート'
      }, {
        id: '',
        name: '恋歌悠遊浪漫譚'
      }, {
        id: '',
        name: '希望への一歩'
      }
    ]
  }, {
    id: '3danimation',
    name: '3Dアニメーション',
    works: [
      {
        id: '',
        name: 'Big Bone Battle'
      }, {
        id: '',
        name: 'Emptiness'
      }, {
        id: '',
        name: 'ゲーム「プロジェクトスティンガー」　ムービー「決戦」'
      }, {
        id: '',
        name: 'DRAGON 怒りの逆襲'
      }, {
        id: '',
        name: '花妖精の輪舞曲'
      }, {
        id: '',
        name: 'Hunter Girl_'
      }
    ]
  }, {
    id: 'drawinganimation',
    name: '作画アニメーション',
    works: [
      {
        id: '',
        name: 'otomodachi'
      }, {
        id: '',
        name: 'コンプリート・システム　<劇場予告PV>'
      }, {
        id: '',
        name: 'Cut off <re:make>'
      }, {
        id: '',
        name: 'Inherit Harmony'
      }
    ]
  }, {
    id: 'webdesign',
    name: 'Webデザイン',
    works: []
  }, {
    id: 'graphicdesign',
    name: 'グラフィックデザイン',
    works: []
  }, {
    id: 'systemapplication',
    name: 'システムアプリケーション',
    works: []
  },
].map(ex => {
  ex.works = ex.works.map(w => {
    w.id = w.id ? w.id : Math.random().toString(28);
    return w;
  });
  return ex;
});
