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
    dispatchEvent(event) {
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
    /**
     * タスクの追加
     * @param value タスク内容
     */
    addNew(value) {
        console.log(`Model value = ${value}`);
        this.dispatchEvent({ type: 'deleteDone' });
    }
    /**
     * 完了済みのタスクの一括削除
     */
    deleteDone() {
        console.log('Model: addNew');
        this.dispatchEvent({ type: 'deleteDone' });
    }
    /**
     * タスクの削除
     * @param index 削除する行番号
     */
    deleteTask(index) {
        console.log(`Model: deleteTask index = ${index}`);
        this.dispatchEvent({ type: 'deleteTask', index: index });
    }
    /**
     * タスク件数の取得
     * @param taskNode タスクのリストアイテム
     */
    getTaskCount(taskNode) {
        console.log(`Model: getDoneCount taskNode = ${taskNode}`);
        let count = 0;
        for (let i = 0; i < taskNode.length; i++) {
            // あとで調べる
            const task = taskNode[i];
            count += task.childNodes[0].checked ? 1 : 0;
        }
        this.dispatchEvent({ type: 'getDoneCount', doneCount: count, taskCount: taskNode.length });
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
