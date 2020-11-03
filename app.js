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
// --------------
/**
 * Viewクラス
 */
class TodoView {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        var self = this;
        // タスク内容
        this.newTaskBody = document.getElementById('newTaskBody');
        // タスクリスト
        this.tasks = document.getElementById('tasks');
        // タスクのアイテムリスト
        this.taskItems = document.getElementsByTagName('li');
        // タスク追加ボタン
        this.addButton = document.getElementById('add');
        this.addButton.onclick = function () {
            controller.addNew(self.newTaskBody.value);
            controller.getTaskCount(self.taskItems);
        };
        model.addEventListener('added', function (event) {
            self.addNew(event.task);
        });
        // タスクの一括削除ボタン
        this.delButton = document.getElementById('deleteDone');
        this.delButton.onclick = function () {
            controller.deleteDone();
            controller.getTaskCount(self.taskItems);
        };
        model.addEventListener('deleteDone', function (event) {
            self.deleteDone();
        });
        // タスクの削除リンク
        this.delLink = document.getElementsByTagName('a');
        this.model.addEventListener('deletedTask', function (event) {
            self.deleteTask(event.index);
        });
        // 完了済みタスク件数と、全体のタスク件数
        this.doneCount = document.getElementById('doneCount');
        this.taskCount = document.getElementById('taskCount');
        this.doneCount.innerHTML = '0'; // 0で初期化
        this.taskCount.innerHTML = '0'; // 0で初期化
        this.model.addEventListener('getDoneCount', function (event) {
            self.renderCounter(event.doneCount, event.taskCount);
        });
    }
    /**
     * タスクの追加
     * @param value タスク内容
     */
    addNew(value) {
        console.log('View: addNew value = ' + value);
        var self = this;
        var li = document.createElement('li');
        var doneCheckbox = document.createElement('input');
        doneCheckbox.type = 'checkbox';
        //HACK:この変ちょっと気持ち悪い
        doneCheckbox.onclick = function () {
            self.controller.getTaskCount(self.taskItems);
        };
        var taskBody = document.createElement('span');
        taskBody.innerHTML = value;
        var delLink = document.createElement('a');
        delLink.innerHTML = '[x]';
        delLink.href = '#';
        //HACK:この変ちょっと気持ち悪い
        delLink.onclick = function () {
            var index = self.getIndex(this.parentNode);
            self.controller.deleteTask(index);
            self.controller.getTaskCount(self.taskItems);
        };
        li.appendChild(doneCheckbox);
        li.appendChild(taskBody);
        li.appendChild(delLink);
        this.tasks.appendChild(li);
        this.newTaskBody.value = '';
    }
    /**
     * タスクの削除
     * @param index 削除する行番号
     */
    deleteTask(index) {
        console.log('View: deleteTask index = ' + index);
        this.tasks.removeChild(this.tasks.children[index]);
    }
    /**
     * 完了済みタスクの一括削除
     */
    deleteDone() {
        console.log('View: deleteDone');
        var taskList = document.querySelectorAll('#tasks > li');
        for (var i = taskList.length - 1; 0 <= i; i--) {
            // children[0] = Checkbox
            var task = taskList[i];
            if (task.children[0].checked) {
                this.tasks.removeChild(this.tasks.children[i]);
            }
        }
    }
    /**
     * 削除対象の行番号取得
     * @param node uiノード
     */
    getIndex(node) {
        console.log('View: getIndex node = ' + node);
        var children = node.parentNode.childNodes;
        for (var i = 0; i < children.length; i++) {
            if (node == children[i])
                break;
        }
        // children[0] に "#text" があるため、そのままindexを返すと+1状態になる
        return i - 1;
    }
    /**
     * タスクの進捗件数の表示
     * @param doneCount 完了済み件数
     * @param taskCount 全体のタスク件数
     */
    renderCounter(doneCount, taskCount) {
        this.doneCount.innerHTML = doneCount.toString();
        this.taskCount.innerHTML = taskCount.toString();
    }
}
/**
 * Controllerクラス
 */
class TodoController {
    constructor(model) {
        this.model = model;
    }
    /**
     * タスクの追加
     * @param value タスク内容
     */
    addNew(value) {
        console.log('Controller: addNew value = ' + value);
        this.model.addNew(value);
    }
    /**
     * 完了済みタスクの一括削除
     */
    deleteDone() {
        console.log('Controller: deleteDone');
        this.model.deleteDone();
    }
    /**
     * タスクの削除
     * @param index 削除する行番号
     */
    deleteTask(index) {
        console.log('Controller: deleteTask index = ' + index);
        this.model.deleteTask(index);
    }
    /**
     * タスクの進捗件数取得
     * @param taskNode タスクのliノード
     */
    getTaskCount(taskNode) {
        console.log('Controller: getDoneCount taskNode = ' + taskNode);
        this.model.getTaskCount(taskNode);
    }
}
/**
 * APPクラス(Main)
 */
class App {
    constructor() {
        const model = new TodoModel();
        const controller = new TodoController(model);
        const view = new TodoView(model, controller);
    }
}
window.onload = () => {
    'use strict';
    const app = new App();
};
