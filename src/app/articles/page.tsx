"use client"

import { useState } from 'react';

export default function Home() {
  // フォームとして扱う値をStateとして宣言（Stateがフォーム要素を管理するための器）
  const [form, setForm] = useState({});

  // フォーム入力された値をStateに反映させるメソッド（Stateで管理されたオブジェクトを更新するメソッド）
  /* 【POINT】
      ・ Stateは常にセッター(setXxxx関数)経由で更新する
          // 以下、NG！
          const handleForm = e => {
            form[e.target.name]: e.target.value;
          };
      ・ Stateに格納されたオブジェクトを更新する際は、新しいオブジェクトを作成してからセッターに渡す（配列も同様）
          ⇒ オブジェクトの一部を更新する場合は、既存のオブジェクトを複製して、更新部分だけを上書きする */
  const handleForm = e => {
    // 更新前のオブジェクトを複製を生成して、更新部分だけを上書きするセッター
    setForm({
      ...form, // スプレッド構文：オブジェクトの複製を生成し、プロパティや要素を分解(展開)する
      [e.target.name]: e.target.value, // 算出プロパティ名：プロパティ名をブラケットで括ることで、式の値からプロパティ名を動的に生成する
    });
  };

  // 複数選択可能なリストボックスの入力値をStateに反映させるメソッド
  const handleTechnologyForm = e => {
    // 選択地を格納するための配列
    const selectedTechnologyList: list = [];

    // <option>要素を順に走査し、選択状態にある値を配列に追加
    /* 【注意点】上記のようなe.target.valueでは、リストボックスの値にはアクセスできない（最初の値のみしか取得できない） */ 
    const opts = e.target.options;
    for (const opt of opts) {
      if (opt.selected) {
        selectedTechnologyList.push(opt.value);
      }
    }

    // 最終的な結果をStateに反映
    setForm({
      ...form,
      [e.target.name]: selectedTechnologyList,
    });
  };

  const categories:list = ["意見", "考察", "社説"];
  const technologies:list = ["HTML", "CSS", "JavaScript", "PHP"];

  const show = () => {
    console.log(form);
  };

  const formCSS = "mx-auto px-12 py-8 max-w-2xl bg-gray-100 border rounded shadow"
  const divCSS = "pb-8"
  const inputCSS = "px-2 py-1 bg-white border rounded-md"
  const buttonCSS = "text-center"

  return(
    <form className={formCSS}>
      <div className={divCSS}>
        <label htmlFor="title">タイトル：</label>
        <input id="title" name="title" type="text" placeholder="春はあけぼの" onChange={handleForm} className={inputCSS} />
      </div>

      <div className={divCSS}>
        <label htmlFor="category">カテゴリー：</label>
        <select id="category" name="category" onChange={handleForm}>
          {categories.map((category, index) => {
            return <option key={index} vlaue={category}>{category}</option>;
          })}
        </select>
      </div>

      <div className={divCSS}>
        <label htmlFor="technology">使用技術：</label>
        <select id="technology" name="technology" multiple={true} onChange={handleTechnologyForm}>
          {technologies.map((technology, index) => {
            return <option key={index} vlaue={technology}>{technology}</option>;
          })}
        </select>
      </div>

      <div className={divCSS}>
        <label htmlFor="body">本文：</label>
        <textarea id="body" name="body" rows="5" cols="50" onChange={handleForm}></textarea>
      </div>

      <div className={buttonCSS}>
        <button type="button" onClick={show}>送信</button>
      </div>      
    </form>
  );
};

// タイトル
// 本文
// 使用技術
// カテゴリー（内容）
// 投稿日（予約投稿を考慮して）
// 下書きか否か
