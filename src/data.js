'use strict';

export default [
  {
    id: 'gamesoftware',
    name: 'ゲームソフト',
    works: [
      {
        id: '',
        name: '未登録'
      }
      // {
      //   id: 'i01',
      //   name: ''
      // }, {
      //   id: 'i02',
      //   name: ''
      // }, {
      //   id: 'i03',
      //   name: ''
      // }, {
      //   id: 'i04',
      //   name: ''
      // }, {
      //   id: 'i05',
      //   name: ''
      // }, {
      //   id: 'i06',
      //   name: ''
      // }
    ]
  }, {
    id: 'gameplannning',
    name: 'ゲーム企画',
    works: [
      {
        id: 'h01',
        name: '去斬華'
      }, {
        id: 'h02',
        name: 'チルボット'
      }, {
        id: 'h03',
        name: 'Frowers'
      }, {
        id: 'h04',
        name: '１ week D'
      }
    ]
  }, {
    id: '3dillustration',
    name: '3Dイラスト',
    works: [
      {
        id: 'f01',
        name: 'Chrysocolla'
      }, {
        id: 'f02',
        name: '大暴れ！金魚すくい？'
      }, {
        id: 'f03',
        name: 'Mushroom House'
      }, {
        id: 'f04',
        name: '旋廻せし焔の泡'
      }
    ]
  }, {
    id: '2dillustration',
    name: '2Dイラスト',
    works: [
      {
        id: 'g01',
        name: '若年騎士アルベール'
      }, {
        id: 'g02',
        name: 'ラフレシアの旅'
      }, {
        id: 'g03',
        name: '天使の日'
      }, {
        id: 'g04',
        name: '煉獄の番人 イフリート'
      }
    ]
  }, {
    id: '3danimation',
    name: '3Dアニメーション',
    works: [
      {
        id: 'e01',
        name: 'Big Bone Battle'
      }, {
        id: 'e02',
        name: 'Emptiness'
      }, {
        id: 'e03',
        name: 'ゲーム「プロジェクトスティンガー」　ムービー「決戦」'
      }, {
        id: 'e04',
        name: 'DRAGON 怒りの逆襲'
      }
    ]
  }, {
    id: 'drawinganimation',
    name: '作画アニメーション',
    works: [
      {
        id: 'd01',
        name: 'otomodachi'
      }, {
        id: 'd02',
        name: 'コンプリート・システム　<劇場予告PV>'
      }, {
        id: 'd03',
        name: 'Cut off <re:make>'
      }, {
        id: 'd04',
        name: 'Inherit Harmony'
      }
    ]
  }, {
    id: 'webdesign',
    name: 'Webデザイン',
    works: [
      {
        id: 'b01',
        name: 'Precious Letter'
      }, {
        id: 'b02',
        name: 'DRIPET'
      }, {
        id: 'b03',
        name: 'KARUKU'
      }, {
        id: 'b04',
        name: 'Hey!Job'
      }
    ]
  }, {
    id: 'graphicdesign',
    name: 'グラフィックデザイン',
    works: [
      {
        id: 'a01',
        name: 'De’Hsuan'
      }, {
        id: 'a02',
        name: 'Sweet’s'
      }, {
        id: 'a03',
        name: 'TRY IT'
      }, {
        id: 'a04',
        name: '「秘められた力」'
      }
    ]
  }, {
    id: 'systemapplication',
    name: 'システムアプリケーション',
    works: [
      {
        id: 'c01',
        name: 'FC3(エフシースリー)'
      }, {
        id: 'c02',
        name: 'PS2(ピーエスツー)'
      }, {
        id: 'c03',
        name: 'ラリー・ツクール・制作部'
      }, {
        id: 'c04',
        name: 'チーム村田'
      }
    ]
  },
].map(ex => {
  ex.works = ex.works.map(w => {
    w.id = w.id ? w.id : Math.random().toString(28);
    return w;
  });
  return ex;
});
