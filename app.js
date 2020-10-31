/**
 * イベントディスパッチャ(Modelの監視)
 */
class EventDispatcher {
    constructor() {
        console.log(this);
        this.listeners = {};
    }
    /**
     * イベントリスナーの追加
     * @param type イベントタイプ
     * @param callback
     */
    addEventListener(type, callback) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }
    /**
     * イベントリスナーの削除
     * @param type イベントタイプ
     * @param callback
     */
    removeEventListener(type, callback) {
        for (let i = 0; i < this.listeners[type]; i++) {
            if (this.listeners[type][i] === callback) {
                this.listeners[type].splice(i, 1);
            }
        }
    }
    /**
     * イベントリスナーのクリア
     */
    clearEventListener() {
        this.listeners = {};
    }
    /**
     * ディスパッチの実行
     * @param event 引数(type: イベントタイプ, [arts]: 任意)
     */
    dispatch(event) {
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
    constructor() {
        super();
    }
}
/**
 * APPクラス(Main)
 */
class App {
    constructor() {
        const model = new TodoModel();
    }
}
window.onload = () => {
    'use strict';
    const app = new App();
};
