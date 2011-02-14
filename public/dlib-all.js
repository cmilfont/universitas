/// <reference path="../ext-3.3.0/adapter/ext/ext-base-debug.js" />
/// <reference path="../ext-3.3.0/ext-all-debug-w-comments.js" />
/// <reference path="../ext-3.3.0/ext-lang-pt_BR.js" />

/*
* DLib JS Library 1.0.0
* Copyright(c) 2010 Fortes Informatica, Inc.
* dlib@grupofortes.com.br
* http://www.fortesinformatica.com.br/dlib
*/

DLib = {
    version: '1.0.0',
    versionDetail: {
        major: 1,
        minor: 0,
        patch: 0
    }
};
DL = DLib;


/*
Customizacao do ExtJS
*/
Ext.form.Field.prototype.msgTarget = 'side';
Ext.form.TextField.prototype.selectOnFocus = true;
Ext.form.ComboBox.prototype.selectOnFocus = true;
Ext.form.ComboBox.prototype.triggerAction = 'all';
Ext.form.ComboBox.prototype.width = 180;
Ext.form.DateField.prototype.width = 100;
// faz com que enter e setas disparem o onBlur, pq nao funcionava
Ext.form.TriggerField.prototype.checkTab = function (me, e) {
    if ([9, 13, 38, 40].indexOf(e.getKey()) != -1)
        this.triggerBlur();
};
// faz com que o ComboBox e DateField abram com "pageDown" ao inves de "down"
Ext.form.ComboBox.prototype._initEvents = Ext.form.ComboBox.prototype.initEvents;
Ext.form.ComboBox.prototype.initEvents = function () {
    Ext.form.ComboBox.prototype._initEvents.call(this);
    var kn = this.keyNav;
    kn.pageDown = kn.down;
    kn._doRelay = kn.doRelay;
    kn.doRelay = function (e, h, hname) {
        if (hname == 'pageDown' && !kn.scope.isExpanded())
            hname = 'down';
        else if (hname == 'down' && !kn.scope.isExpanded())
            hname = null;
        return kn._doRelay(e, h, hname);
    };
};
Ext.form.DateField.prototype._initEvents = Ext.form.DateField.prototype.initEvents;
Ext.form.DateField.prototype.initEvents = function () {
    Ext.form.DateField.prototype._initEvents.call(this);
    var kn = this.keyNav;
    kn.pageDown = kn.down;
    kn.down = null;
    kn._doRelay = kn.doRelay;
    kn.doRelay = function (e, h, hname) {
        if (hname == 'pageDown')
            hname = 'down';
        else if (hname == 'down')
            hname = null;
        return kn._doRelay(e, h, hname);
    };
};


/*
DLUtils
Namespace de utilitarios
*/
DL.utils = {};
DLUtils = DL.utils;

// junta atributos de dois ou mais objetos
DLUtils.join = function () {
    var mixed;
    for (var i = 0; i < arguments.length; i++) {
        if (!mixed)
            mixed = {};
        Ext.apply(mixed, arguments[i]);
    }
    return mixed;
};

// "el" pode ser uma referencia direta ou um ID dom/ext retorna a referencia ao objeto ext
DLUtils.ext = function (el) {
    if (!el)
        return null;
    if (typeof el == 'string') {
        var id = el;
        el = Ext.getCmp(id);
        if (!el) {
            var sel = Ext.get(id);
            if (sel)
                el = sel.dom._extRef;
        }
        if (!el)
            throw String.format('Elemento extjs nao encontrado: "{0}"', [id]);
    }
    return el;
};

// encontra o componente "el", foca e dah selectall
DLUtils.postFocus = function (el, delay) {
    if (!delay)
        delay = 10;
    setTimeout(function () {
        var cmp = DLUtils.ext(el);
        try {
            cmp.focus();
        } catch (ex) { }
    }, delay);
};

// mostra em tela os atributos de um elemento
DLUtils.debug = function (el) {
    if (el == null || el == undefined) {
        alert('null');
        return;
    }
    var s = "[" + el + "]\n";
    for (var m in el)
        s += m + "\n";
    alert(s);
};


DLUtils.arrowKeyNav = function () {
    function canStop(e) {
        return e.tabIndex != -1;
    }

    function findSiblings(id) {
        var all = Ext.query('.x-form-field');

        var visible = Ext.partition(all, function(elemento) {
            return elemento.className.indexOf('x-hide-display') === -1;
        })[0];

        var one = Ext.query('#' + id);
        if (visible.length && one.length) {
            var i = visible.indexOf(one[0]);
            if (i != -1) {
                var iprior = i - 1;
                var inext = i + 1;
                while (iprior >= 0 && !canStop(visible[iprior]))
                    iprior--;
                while (inext < visible.length && !canStop(visible[inext]))
                    inext++;
                var sib = {
                    prior: iprior >= 0 ? visible[iprior] : undefined,
                    next: inext < visible.length ? visible[inext] : undefined
                };
                return sib;
            }
        }
        return { prior: undefined, next: undefined };
    }

    function isDroppedDown(dom) {
        var cmp = Ext.getCmp(dom.id);
        return cmp && cmp.isExpanded && cmp.isExpanded();
    }

    function handleKeyDown(e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        var dir;
        if (event.keyCode == 38 || (event.keyCode == 9 && event.shiftKey)) {
            if (isDroppedDown(target))
                return true;
            dir = -1;
        }
        else if (event.keyCode == 40 || event.keyCode == 13 || (event.keyCode == 9 && !event.shiftKey)) {
            if (isDroppedDown(target))
                return true;
            dir = 1;
        }
        else
            return true;
        var sib = findSiblings(target.id);
        if (sib) {
            if (dir < 0 && sib.prior)
                DLUtils.postFocus(sib.prior.id, 1);
            else if (dir > 0 && sib.next)
                DLUtils.postFocus(sib.next.id, 1);
        }
        event.stopEvent();
        return true;
    }
    Ext.get(document).on('keydown', handleKeyDown);
};
Ext.onReady(DLUtils.arrowKeyNav);


/*
DLData
Namespace de persistencia
*/
DL.data = {};
DLData = DL.data;

// uma entidade
DLData.EntityModel = function (config) {
    this.defaults = config && config.defaults;
    this.title = config && config.title;
    this.fields = [];

    // adiciona campo aa definicao da entidade
    this.addField = function (name, config) {
        var cfg = DLUtils.join(this.defaults, config);
        if (!cfg.name && name)
            cfg.name = name;
        var field = new DLData.FieldModel(cfg);
        this.fields[this.fields.length] = field;
        this[cfg.name] = field;
        return field;
    };

    if (config && config.fields) {
        for (var i = 0; i < config.fields.length; i++) {
            var p = config.fields[i];
            var f;
            if (Ext.isString(p))
                this.addField(p);
            else
                this.addField(null, p);
        }
    }

    // retorna o field com atributo identity
    this.idField = function () {
        for (var i = 0; i < this.fields.length; i++) {
            var f = this.fields[i];
            if (f.identity)
                return f;
        }
        return null;
    };

    // converte objeto record em plano
    this.recordToPlain = function (record, plain) {
        if (!plain)
            plain = {};
        for (var i = 0; i < this.fields.length; i++) {
            var f = this.fields[i];
            var value = record.get(f.name);
            if (value == undefined)
                value = f.defaultValue;
            plain[f.name] = value;
        }
        return plain;
    };

    // retorna construtor do record
    this.recordClass = function () {
        var recFields = [];
        for (var i = 0; i < this.fields.length; i++) {
            var f = this.fields[i];
            var recField = {
                name: f.name,
                type: f.type,
                allowBlank: f.allowBlank
            };
            recFields[i] = recField;
        }
        return Ext.data.Record.create(recFields);
    };

    // converte plano em record
    this.plainToRecord = function (plain, record) {
        if (!record) {
            var cls = this.recordClass();
            record = new cls(plain);
        }
        for (var i = 0; i < this.fields.length; i++) {
            var f = this.fields[i];
            record.set(f.name, plain[f.name]);
        }
        return record;
    };

    // cria uma instancia de plano com valores default
    this.create = function (values) {
        var plain = {};
        for (var i = 0; i < this.fields.length; i++) {
            var f = this.fields[i];
            var value = undefined;
            if (values)
                value = values[f.name];
            if (value == undefined)
                value = f.defaultValue;
            plain[f.name] = value;
        }
        return plain;
    };

    // fornece o binder de tela
    this.binding = new DLData.Binding(this);
};

// binding de tela
DLData.Binding = function (entityModel) {
    var model = entityModel;

    // percorre os fields que tem editores
    function bind(src, binder) {
        var flds = model.fields;
        for (var f = 0; f < flds.length; f++) {
            var fld = flds[f];
            if (Ext.isString(fld.cmps)) {
                var cmp = Ext.getCmp(fld.cmps);
                if (cmp && binder(fld, src, cmp))
                    return;
            }
            else if (Ext.isArray(fld.cmps)) {
                for (var c = 0; c < fld.cmps.length; c++) {
                    var cmp = fld.cmps[c];
                    if (Ext.isString(cmp))
                        cmp = Ext.getCmp(cmp);
                    if (cmp && binder(fld, src, cmp))
                        return;
                }
            }
            else {
                var cmp = Ext.getCmp(fld.name);
                if (cmp && binder(fld, src, cmp))
                    return;
            }
        }
    };

    // limpa editores
    this.clear = function () {
        bind(null, function (fld, src, cmp) {
            cmp.setValue(fld.defaultValue);
            cmp.setReadOnly(false);
        });
    };

    // carrega editores com esse plain
    this.load = function (plain, readOnly) {
        bind(plain, function (fld, src, cmp) {
            cmp.setValue(src[fld.name]);
            cmp.setReadOnly(readOnly == true);
        });
    };

    // salva editores no plain
    this.save = function (plain) {
        if (!plain)
            plain = {};
        bind(plain, function (fld, src, cmp) {
            plain[fld.name] = cmp.getValue();
        });
        return plain;
    };

    // foca o primeiro editor
    this.focusFirst = function () {
        bind(null, function (fld, src, cmp) {
            if (!cmp.hidden && !cmp.disabled) {
                DLUtils.postFocus(cmp.id, 50);
                return true;
            }
        });
    };
};

// um field de uma entidade
DLData.FieldModel = function (config) {
    this.name = undefined;
    this.allowBlank = true;
    this.defaultValue = undefined;
    this.cmps = undefined;
    this.sortable = undefined;
    this.title = undefined;
    this.hidden = undefined;
    this.identity = undefined;
    if (config)
        Ext.apply(this, config);
    if (this.type == 'date' && !this.dateFormat)
        this.dateFormat = 'd/m/Y';
};


/*
DLGrid
Namespace de grids
*/
DL.grid = {};
DLGrid = DL.grid;


/*
DLCrud
Namespace de grids
*/
DL.crud = {};
DLCrud = DL.crud;

DLCrud.CrudProxy = Ext.extend(Ext.data.HttpProxy, {
    constructor: function (baseUrl, config) {
        if (!baseUrl)
            baseUrl = './';
        else if (baseUrl[baseUrl.length - 1] != '/')
            baseUrl += '/';
        var baseConfig = {
            api: {
                create: baseUrl + 'Inclui',
                read: baseUrl + 'Lista',
                update: baseUrl + 'Altera',
                destroy: baseUrl + 'Exclui'
            }
        };
        Ext.apply(baseConfig, config);
        DLCrud.CrudProxy.superclass.constructor.call(this, baseConfig);
    }
});

DLCrud.CrudStore = Ext.extend(Ext.data.JsonStore, {
    rowsPerPage: 10,
    constructor: function (entityModel, baseUrl, rowsPerPage, config) {
        if (rowsPerPage)
            this.rowsPerPage = rowsPerPage;
        var idFld = entityModel.idField().name;
        var baseConfig = {
            // configuracoes do reader
            restful: true,
            root: 'Dados',
            idProperty: idFld,
            totalProperty: 'Total',
            messageProperty: 'Mensagem',
            successProperty: 'Sucesso',
            remoteSort: true,
            fields: entityModel.fields,
            //
            proxy: new DLCrud.CrudProxy(baseUrl),
            writer: new Ext.data.JsonWriter({
                encode: false,
                writeAllFields: true
            }),
            autoSave: true,
            sortInfo: { field: idFld, direction: 'ASC' },
            pruneModifiedRecords: true,
            listeners: {
                save: function () {
                    // Se a quantidade de itens exibidos ultrapassar o tamanho da pagina,
                    // carregar a pagina seguinte
                    if (this.data.length > this.rowsPerPage) {
                        this.reload({
                            params: {
                                start: this.lastOptions.params.start + this.rowsPerPage,
                                limit: this.rowsPerPage
                            }
                        })
                    }
                    // Se nao houver dados na pagina e a pagina nao for a primeira,
                    // carregar a pagina anterior
                    else if (this.data.length == 0 && this.lastOptions.params.start > 0) {
                        this.reload({
                            params: {
                                start: this.lastOptions.params.start - this.rowsPerPage,
                                limit: this.rowsPerPage
                            }
                        });
                    }
                },
                exception: function (proxy, type, action, exception) {
                    // Se houver modificacoes no store, devem ser rejeitadas, pois nao foram persistidas no servidor.
                    if (action == "create") {
                        this.each(function (record) {
                            if (record.phantom)
                                record.store.remove(record);
                        });
                    } else if (action == "update") {
                        this.rejectChanges();
                    }

                    Ext.Msg.show({
                        title: 'Erro',
                        msg: 'N\xe3o foi poss\xedvel executar a opera\xe7\xe3o solicitada',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        };

        Ext.apply(baseConfig, config);
        DLCrud.CrudStore.superclass.constructor.call(this, baseConfig);
    }
});

DLUtils.floatRenderer = function (valor) {
    var valorMascarado = valor;

    if (valorMascarado != "") {
        if (isNaN(valorMascarado))
            valorMascarado = "0";
        sign = (valorMascarado == (valorMascarado = Math.abs(valorMascarado)));
        valorMascarado = Math.floor(valorMascarado * 100 + 0.50000000001);
        centavos = valorMascarado % 100;
        valorMascarado = Math.floor(valorMascarado / 100).toString();
        if (centavos < 10)
            centavos = "0" + centavos;
        for (var i = 0; i < Math.floor((valorMascarado.length - (1 + i)) / 3); i++)
            valorMascarado = valorMascarado.substring(0, valorMascarado.length - (4 * i + 3)) + '.' +
                        valorMascarado.substring(valorMascarado.length - (4 * i + 3));

        valorMascarado = (((sign) ? '' : '-') + valorMascarado + ',' + centavos);
    }

    return valorMascarado;
};

DLCrud.CrudGrid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (entityModel, store, config) {
        var me = this;

        var pagingCfg = {
            store: store,
            pageSize: store.rowsPerPage,
            displayInfo: true
        };

        if (config && config.filterCB)
            pagingCfg.items = ['-', { text: 'Filtrar', iconCls: 'crud-filter', handler: function () { config.filterCB(me); } }];

        var pagingBar = new Ext.PagingToolbar(pagingCfg);
        if (!config) config = {};

        var availableTools = {
            "new": function () {
                addTool('Novo', 'crud-add', config.allowNew, config.newCB, false, function () {
                    if (config.newCB)
                        config.newCB(me);
                })
            },

            "edit": function () {
                addTool('Alterar', 'crud-edit', config.allowEdit, config.editCB, true, function (record) {
                    if (config.editCB)
                        config.editCB(me, record);
                })
            },

            "delete": function () {
                addTool('Excluir', 'crud-delete', config.allowDelete, config.deleteCB, true, function (record) {
                    Ext.MessageBox.confirm('Confirma\xe7\xe3o', 'Deseja realmente excluir esse item?', function (bt) {
                        if (bt != 'yes')
                            return;
                        if (config.deleteCB)
                            config.deleteCB(me, record);
                        store.remove(record);
                    });
                });
            },

            "details": function () {
                addTool('Detalhes', 'crud-details', config.allowDetail, config.detailCB, true, function (record) {
                    if (config.detailCB)
                        config.detailCB(me, record);
                });
            },

            "print": function () {
                addTool('Imprimir', 'crud-print', config.allowPrint, config.printCB, false, function () {
                    if (config.printCB)
                        config.printCB(me);
                });
            }
        };

        function addTool(title, iconCls, allowed, userHandler, needsRecord, handler) {
            if (allowed == null || allowed == undefined)
                allowed = true && (userHandler);
            var toolCfg = {
                text: title,
                iconCls: iconCls,
                disabled: !allowed,
                handler: function () {
                    if (needsRecord) {
                        var record = me.getSelectionModel().getSelected();
                        if (!record) {
                            Ext.MessageBox.alert("Alerta", "Selecione um item.");
                            return;
                        }
                        handler(record);
                    }
                    else
                        handler();
                }
            };
            if (toolBar.length > 0)
                toolBar[toolBar.length] = '-';
            toolBar[toolBar.length] = toolCfg;
            return toolCfg;
        };

        var toolBar = null;

        if (config.tools) {
            var tools = config.tools;

            toolBar = [];

            for (var i = 0; i < tools.length; i++) {
                if (availableTools[tools[i]])
                    availableTools[tools[i]]();
            }
        }

        function gridColumns() {
            var columns = [];
            var colCount = 0;
            for (var i = 0; i < entityModel.fields.length; i++) {
                var field = entityModel.fields[i];
                var hidden = field.hidden == true || (field.column && field.column.hidden == true);
                // se o field eh hidden, eu nao crio a coluna, senao ela vai aparecer no checklist da grid
                if (!hidden) {
                    var column = field.column || {};
                    Ext.applyIf(column, {
                        dataIndex: field.name,
                        header: field.header || field.title || field.name,
                        sortable: field.sortable,
                        renderer: field.renderer
                    });
                    if (field.type == 'date' && !column.renderer)
                        column.renderer = Ext.util.Format.dateRenderer('d/m/Y');
//                    if (field.type == 'date' && !column.width)
//                        column.width = 50;
//                    if (field.type == 'float' && !column.width)
//                        column.width = 50;
                    if (field.type == 'float' && !column.renderer)
                        column.renderer = DLUtils.floatRenderer;
                    if (field.type == 'float' && !column.align)
                        column.align = 'right';
                    columns[colCount++] = column;
                }
            }
            return columns;
        }

        var baseConfig = {
            store: store,
            loadMask: true,
            columns: gridColumns(),
            ddGroup: 'dd1', ///TODO escolher dinamicamente o nome do grupo? ou nome fixo?
            enableDragDrop: true, ///TODO implementar Ext.dd.DropTarget
            tbar: toolBar,
            bbar: pagingBar,
            view: new Ext.grid.GridView({ forceFit: true }),
            selModel: new Ext.grid.RowSelectionModel({
                singleSelect: true
            }),
            width: 500,
            height: 330,
            stripeRows: true,
            border: false,
            frame: false
        };

        Ext.apply(baseConfig, config);

        DLCrud.CrudGrid.superclass.constructor.call(this, baseConfig);
    }
});

DLCrud.sites = {};

DLCrud.CrudWindow = Ext.extend(Ext.Window, {
    getGrid: undefined,
    getStore: undefined,

    constructor: function (config) {
        var siteId = config && config.id || Ext.id();
        var model = config && config.model;
        var form = config && config.form;
        var homeUrl = config && config.homeUrl;

        DLCrud.sites[siteId] = this;

        var store = new DLCrud.CrudStore(model, homeUrl);
        this.getStore = function () { return store; };

        var grid = new DLCrud.CrudGrid(model, store, {
            newCB: function (g) { showEmptyPopup(); },
            editCB: function (g, r) { showEditPopup(r); },
            detailCB: function (g, r) { showDetailPopup(r); },
            allowDelete: true,
            deleteCB: undefined,
            filterCB: function () { alert('filter?'); },
            printCB: function () { showReportList(); }
        });
        this.getGrid = function () { return grid; };

        var contBt, dontBt, saveBt, cancBt;
        function enableButtons(contState, doneState, saveState, cancelState) {
            if (!contBt)
                return;
            contBt.setVisible(contState);
            dontBt.setVisible(doneState);
            saveBt.setVisible(saveState);
            cancBt.setVisible(cancelState);
        }

        var detailWin = new Ext.Window({
            layout: 'fit',
            closeAction: 'hide',
            plain: true,
            items: form
        });
        detailWin.on('show', function () { grid.setDisabled(true); });
        detailWin.on('hide', function () { grid.setDisabled(false); });

        var op = null;
        function showEmptyPopup() {
            op = 'n';
            detailWin.setTitle(model.title + ' - Novo');
            model.binding.clear();
            enableButtons(true, false, true, true);
            contBt.setValue(false);
            detailWin.show();
            model.binding.focusFirst();
        }

        function resetEmptyPopup() {
            model.binding.clear();
            model.binding.focusFirst();
        }

        function showEditPopup(record) {
            op = 'e';
            detailWin.setTitle(model.title + ' - Altera\xe7\xe3o');
            var plain = model.recordToPlain(record);
            model.binding.load(plain);
            enableButtons(false, false, true, true);
            detailWin.show();
            model.binding.focusFirst();
        }

        function showDetailPopup(record) {
            op = 'v';
            detailWin.setTitle(model.title + ' - Detalhes');
            var plain = model.recordToPlain(record);
            model.binding.load(plain, true);
            enableButtons(false, true, false, false);
            detailWin.show();
        }

        function showReportList() {
            window.open('/Home/ExibeRelatorioListagem', model.title + ' - Listagem');
        }

        function insertRecord() {
            var plain = model.binding.save();
            var record = model.plainToRecord(plain);
            if (!record.isValid()) {
                Ext.Msg.show({
                    title: 'Erro',
                    msg: 'O formul\xe1rio possui dados inv\xe1lidos',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
                return false;
            }
            store.add(record);
            return true;
        }

        function updateRecord() {
            var plain = model.binding.save();
            var idFld = model.idField().name;
            var record = store.query(idFld, plain[idFld]).first();
            record.beginEdit();
            model.plainToRecord(plain, record);
            record.endEdit();
            return true;
        }

        if (form) {
            contBt = form.addButton({ xtype: 'checkbox', boxLabel: 'Continuar incluindo' });
            contBt.on('afterrender', function () { Ext.get(contBt.id).dom.tabIndex = -1; });
            dontBt = form.addButton({ text: 'Fechar', handler: cancelEditing });
            saveBt = form.addButton({ text: 'Salvar', handler: saveEditing, formBind: true });
            cancBt = form.addButton({ text: 'Cancelar', handler: cancelEditing });
            form.monitorValid = true;
        }

        function saveEditing() {
            var done;
            var fld = model.idField();
            // descubro qual o valor do Id nos edits pra saber se incluo ou altero um registro
            // o fld.cmps pode ser uma string com o id do input, ou um array com ids de varios inputs
            var cmpId;
            if (fld.cmps && Ext.isString(fld.cmps))
                cmpId = fld.cmps;
            else if (fld.cmps && fld.cmps.length > 0)
                cmpId = fld.cmps[0];
            if (!cmpId)
                cmpId = fld.name;
            //
            var id = Ext.get(cmpId).getValue();
            if (id)
                done = updateRecord();
            else
                done = insertRecord();
            if (done) {
                if (op == 'n' && contBt.getValue())
                    resetEmptyPopup();
                else
                    detailWin.hide();
            }
        }

        function cancelEditing() {
            detailWin.hide();
        }

        var baseConfig = {
            title: model.title,
            layout: 'fit',
            closeAction: 'close',
            plain: true,
            items: grid
        };
        DLCrud.CrudWindow.superclass.constructor.call(this, baseConfig);

        this.on('close', function () {
            if (detailWin) {
                detailWin.close();
                detailWin = null;
            }
            DLCrud.sites[siteId] = null;
        });

        this._show = this.show;
        var loaded;
        this.show = function () {
            this._show();
            if (!loaded) {
                this.getStore().load({
                    params: {
                        start: 0,
                        limit: this.getStore().rowsPerPage
                    }
                });
                loaded = true;
            }
        };
    }
});


/*
DLCtrl
Namespace de controles visuais
*/
DL.ctrl = {};
DLCtrl = DL.ctrl;

Ext.form.Field.prototype.initBind = function () {
    if (!this.name)
        this.name = this.id;
    var f = this.field;
    if (f) {
        if (!f.cmps)
            f.cmps = [this.id];
        else if (Ext.isArray(f.cmps))
            f.cmps[f.cmps.length] = this.id;
        else
            f.cmps = [f.cmps, this.id];
        if (!this.fieldLabel)
            this.fieldLabel = f.header || f.name;
    }
}

DLCtrl.TextField = Ext.extend(Ext.form.TextField, {
    initComponent: function () {
        DLCtrl.TextField.superclass.initComponent.call(this);
        this.initBind();
    }
});
Ext.reg('dltextfield', DLCtrl.TextField);

DLCtrl.NumberField = Ext.extend(Ext.form.NumberField, {
    initComponent: function () {
        DLCtrl.NumberField.superclass.initComponent.call(this);
        this.initBind();
        this.validationEvent = false;
    }
});
Ext.reg('dlnumberfield', DLCtrl.NumberField);

DLCtrl.DateField = Ext.extend(Ext.form.DateField, {
    initComponent: function () {
        DLCtrl.DateField.superclass.initComponent.call(this);
        this.initBind();
    }
});
Ext.reg('dldatefield', DLCtrl.DateField);

DLCtrl.ComboBox = Ext.extend(Ext.form.ComboBox, {
    initComponent: function () {
        DLCtrl.ComboBox.superclass.initComponent.call(this);
        this.initBind();
    }
});
Ext.reg('dlcombo', DLCtrl.ComboBox);

DLCtrl.FormPanel = Ext.extend(Ext.FormPanel, {
    constructor: function (userConfig) {
        var config = {
            labelWidth: 75,
            frame: false,
            autoWidth: true,
            autoHeight: true,
            bodyStyle: 'padding:16px 24px 16px 24px'
        };
        Ext.apply(config, userConfig);
        DLCtrl.FormPanel.superclass.constructor.call(this, config);
    }
});
Ext.reg('dlformpanel', DLCtrl.FormPanel);

DLCtrl.TreeMenu = Ext.extend(Ext.tree.TreePanel, {
    menuUrl: undefined,
    constructor: function (config) {
        if (Ext.isString(config))
            this.menuUrl = config;
        else if (Ext.isObject(config))
            this.menuUrl = config.menuUrl;

        var treeCfg = {
            useArrows: true,
            autoScroll: false,
            animate: true,
            enableDD: true,
            containerScroll: true,
            rootVisible: false,
            border: false,
            root: {
                nodeType: 'async',
                text: 'root',
                draggable: false,
                expanded: true,
                id: 'root',
                children: []
            },
            listeners: {
                click: function (n) {
                    if (n.attributes.action)
                        callJS(n.attributes.action);
                    else if (n.attributes.leaf)
                        Ext.Msg.alert('Menu', 'Clicou em "' + n.text + '"');
                }
            }
        };
        if (Ext.isObject(config))
            Ext.apply(treeCfg, config);

        DLCtrl.TreeMenu.superclass.constructor.call(this, treeCfg);

        function callJS(url) {
            Ext.Ajax.request({
                params: {},
                url: url,
                callback: function (a, b, resp) {
                    if (b)
                        eval(resp.responseText);
                },
                indicatorText: ''
            });
        }
    },
    addItems: function (items) {
        function scan(items, children) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var node = { text: item.text, action: item.action };
                if (item.items) {
                    node.cls = 'folder';
                    node.children = [];
                    scan(item.items, node.children);
                }
                else {
                    node.cls = 'folder';
                    node.leaf = true;
                }
                children[children.length] = node;
            }
        }

        var root = {
            nodeType: 'async',
            text: 'root',
            draggable: false,
            expanded: true,
            id: 'root',
            children: []
        };
        scan(items, root.children);
        this.setRootNode(root);
    },
    initComponent: function () {
        DLCtrl.TreeMenu.superclass.initComponent.call(this);
        this.on('render', this.doAutoLoad, this, { delay: 10 });
    },
    doAutoLoad: function () {
        var me = this;
        Ext.Ajax.request({
            params: {},
            url: this.menuUrl,
            success: function (resp) {
                me.addItems(eval(resp.responseText));
            },
            indicatorText: ''
        });
    }
});
Ext.reg('dltreemenu', DLCtrl.TreeMenu);
