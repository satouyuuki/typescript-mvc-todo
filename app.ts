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
  dispatch(event): void {
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
}

/**
 * APPクラス(Main)
 */
class App {
  'use strict';
  constructor() {
    const model = new TodoModel();
  }
}
window.onload = () => {
  'use strict';
  const app = new App();
}