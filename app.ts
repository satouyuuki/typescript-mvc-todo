/**
 * イベントディスパッチャ(Modelの監視)
 */
class EventDispatcher {
  'use strict';
  listeners: any;

  constructor() {
    console.log(this);
    this.listeners = {};
  }

  /**
   * イベントリスナーの追加
   * @param type イベントタイプ
   * @param callback
   */
  addEventListener(type: string, callback: Function): void {
    if (!this.listeners[type]) {
      this.listeners[type] = []
    }
    this.listeners[type].push(callback);
  }

  /**
   * イベントリスナーの削除
   * @param type イベントタイプ
   * @param callback
   */
  removeEventListener(type: string, callback: Function): void {
    for (let i = 0; i < this.listeners[type]; i++) {
      if (this.listeners[type][i] === callback) {
        this.listeners[type].splice(i, 1);
      }
    }
  }
  /**
   * イベントリスナーのクリア
   */
  clearEventListener(): void {
    this.listeners = {};
  }
  /**
   * ディスパッチの実行
   * @param event 引数(type: イベントタイプ, [arts]: 任意)
   */
  dispatchEvent(event): void {
    if (this.listeners[event.type]) {
      for (let listener in this.listeners[event.type]) {
        this.listeners[event.type][listener].apply(this.listeners, arguments);
      }
    }
  }
}

/**
 * Modelクラス
 */
class TodoModel extends EventDispatcher {
  'use strict';
  constructor() {
    super();
  }

  /**
   * タスクの追加
   * @param value タスク内容
   */
  addNew(value: string): void {
    console.log(`Model value = ${value}`);
    this.dispatchEvent({ type: 'deleteDone' });
  }
  /**
   * 完了済みのタスクの一括削除
   */
  deleteDone(): void {
    console.log('Model: addNew');
    this.dispatchEvent({ type: 'deleteDone' });
  }
  /**
   * タスクの削除
   * @param index 削除する行番号
   */
  deleteTask(index: number): void {
    console.log(`Model: deleteTask index = ${index}`);
    this.dispatchEvent({ type: 'deleteTask' , index: index});
  }
  /**
   * タスク件数の取得
   * @param taskNode タスクのリストアイテム
   */
  getTaskCount(taskNode: NodeList): void {
    console.log(`Model: getDoneCount taskNode = ${taskNode}`);
    let count = 0;
    for (let i = 0; i < taskNode.length; i++) {
      // あとで調べる
      const task = <HTMLElement>taskNode[i];
      count += (<HTMLInputElement>task.childNodes[0]).checked ? 1 : 0;
    }
    this.dispatchEvent({ type: 'getDoneCount', doneCount: count, taskCount: taskNode.length });
  }
}

/**
 * Controllerクラス
 */
class TodoController {
  'use strict';
  constructor(private model: TodoModel) {
  }

  /**
   * タスクの追加
   * @param value タスク内容
   */
  addNew(value: string): void {
    console.log('Controller: addNew value = ' + value);
    this.model.addNew(value);
  }

  /**
   * 完了済みタスクの一括削除
   */
  deleteDone(): void {
    console.log('Controller: deleteDone');
    this.model.deleteDone();
  }

  /**
   * タスクの削除
   * @param index 削除する行番号
   */
  deleteTask(index: number): void {
    console.log('Controller: deleteTask index = ' + index);
    this.model.deleteTask(index);
  }

  /**
   * タスクの進捗件数取得
   * @param taskNode タスクのliノード
   */
  getTaskCount(taskNode: NodeList): void {
    console.log('Controller: getDoneCount taskNode = ' + taskNode)
    this.model.getTaskCount(taskNode);
  }
}
/**
 * APPクラス(Main)
 */
class App {
  'use strict';
  constructor() {
    const model = new TodoModel();
    const controller = new TodoController(model);
  }
}
window.onload = () => {
  'use strict';
  const app = new App();
}