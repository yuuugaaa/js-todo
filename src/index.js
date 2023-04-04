import "./styles.css";

const onClickAdd = () => {
  // 入力値を受け取り、空欄にする
  const inputText = document.getElementById("input-text").value;
  document.getElementById("input-text").value = "";

  // 未完了リストにタスクを追加する
  createIncompleteTask(inputText);
};

// 未完了リストから指定の要素を削除する関数
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストにタスクを追加する関数
const createIncompleteTask = (text) => {
  // liタグを生成
  const li = document.createElement("li");
  li.className = "ToDo-task";

  // divタグを生成
  const div = document.createElement("div");
  div.innerText = text;

  // button(完了)タグを生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";

  // 完了ボタン押下時の設定
  completeButton.addEventListener("click", () => {
    // 完了ボタンの押されたタスクを未完了リストから削除(親(div)の親(li))
    const completeTarget = completeButton.parentNode.parentNode;
    deleteFromIncompleteList(completeTarget);

    // 完了ボタンの押されたタスクのタスク名を取得
    const completeText = completeTarget.lastChild.childNodes[0].textContent;

    // button(戻す)タグを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";

    // 戻すボタン押下時の設定
    backButton.addEventListener("click", () => {
      // 戻すボタンの押されたタスクを完了リストから削除(親(div)の親(li))
      const backTarget = backButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(backTarget);

      // 戻すボタンの押されたタスクのタスク名を取得
      const backText = backTarget.lastChild.childNodes[0].textContent;

      // 未完了リストにタスクを追加する
      createIncompleteTask(backText);
    });

    // 完了ボタンの押されたタスクの中身を空にする
    completeTarget.lastChild.textContent = null;

    // 空にしたところに、タスク名とbutton(戻す)タグを入れる
    completeTarget.lastChild.innerText = completeText;
    completeTarget.lastChild.appendChild(backButton);

    // 完了リストに生成した要素を追加
    document.getElementById("complete-list").appendChild(completeTarget);
    console.log(completeTarget);
  });

  // button(削除)タグを生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";

  // 削除ボタン押下時の設定
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(div)の親タグ(li)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode.parentNode);
  });

  // liタグの子要素に、divタグを設定
  li.appendChild(div);

  // divタグの子要素に、buttonタグを設定
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了リストに生成した要素を追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
