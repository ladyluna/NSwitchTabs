if (!window.NSwitchTabs) {

var NSwitchTabs = (function() {

'use strict';

/**
 * NSwitch Tabs
 *
 * @version 2.5
 * @author Natalia Uvarova
 */

/**
 * @constructor NSwitchTabs
 *
 * @param {jQuery Object} $container Контейнер блока с переключателями табов
 * @param {jQuery Object} $containerView Контейнер блока с контентом табов
 * @param {Object} params параметры
 *        {String} params.buttonsDataAttrName Имя data-атрибута для элементов переключателей табов
 *        {String} params.tabsDataAttrName Имя data-атрибута для элементов контента табов
 *        {String} params.activeButton Класс для обозначения текущего переключателя табы
 *        {String} params.activeTab Класс для обозначения текущей табы
 *        {String} params.hiddenTab Класс для обозначения скрытой табы
 *        {boolean} params.useLocalStorage Признак сохранять выбранную табу в localStorage или нет
 *        {String} params.keyLocalStorage Ключ для localStorage
 */

/**
 * Version 2.2: 
 * Добавлена проверка на наличия существования табы (в случае когда мы достаём значение из localStorage)
 *
 * Version 2.3: 
 * Добавлена проверка на существование NSwitchTabs
 *
 * Version 2.4: 
 * Исправлена ошибка в _config 
 *
 * Version 2.5:
 * Добавлена возможность переименования data-атрибутов, обозначающих элементы табов
 * Добавлено определение имени предыдущей табы по событию 'tabs.change'
 */
var NSwitchTabs = function($container, $containerView, params) {

    this.init($container, $containerView, params);
};

NSwitchTabs.prototype = {

    _config: {
        buttonsDataAttrName: 'tab',
        tabsDataAttrName: 'tab',
        activeButton: 'curr',
        activeTab: 'curr',
        hiddenTab: 'hidden',
        useLocalStorage: false,
        keyLocalStorage: 'selectTab'
    },

    /**
     * @method init
     *
     * @param {jQuery Object} $container Контейнер блока с переключателями табов
     * @param {jQuery Object} $containerView Контейнер блока с контентом табов
     * @param {Object} params параметры
     */
    init: function ($container, $containerView, params) {

        var that = this;

        that._config = $.extend({}, that._config, params);

        that.$container = $container;
        that.$containerView = $containerView;

        that.$buttons = that.$container.find('[data-' + that._config.buttonsDataAttrName + ']');
        that.$tabs = that.$containerView.find('[data-' + that._config.tabsDataAttrName+ ']');

        //localStorage.clear();

        that.binding();
        
        try {

            if (that._config.useLocalStorage && localStorage && (localStorage.getItem(that._config.keyLocalStorage) !== null)) {
            
                that.currTabName = localStorage.getItem(that._config.keyLocalStorage);

                if (!that.$buttons.filter('[data-'+ that._config.buttonsDataAttrName + '="' + that.currTabName + '"]').length) {
                    throw new Error('Такой вкладки не существует');
                }
                
            } else {

                that.currTabName = that.$buttons.filter(':first').data(that._config.buttonsDataAttrName);
            }

        } catch(e) {

            that.currTabName = that.$buttons.filter(':first').data(that._config.buttonsDataAttrName);
        }

        that.$container.trigger('tabs.change', [that.currTabName, null]);

    },

    /**
     * @method binding
     */
    binding: function() {

        var that = this;

        that.$container.on('click', '[data-' + that._config.buttonsDataAttrName + ']', function(event) {

            var tabName = $(this).data(that._config.buttonsDataAttrName);
            var prevTabName = that.currTabName;

            if (that.currTabName && tabName !== that.currTabName) {
                that.$container.trigger('tabs.change', [tabName, prevTabName]);
                event.preventDefault();
            }
            
        });

        that.$container.on('tabs.change', function(event, tabName, prevTabName) {

            that.currTabName = tabName;
            that.selectButton(tabName);
            that.showTab(tabName);

            if (that._config.useLocalStorage) {

                try {

                    if (localStorage) {
                        localStorage.setItem(that._config.keyLocalStorage, tabName);
                    }

                } catch(e) {

                }

            }
            
        });

        return that;

    },

    /**
     * @method selectButton
     *
     * @param {String} tabName Имя Переключателя, который отмечаем
     */
    selectButton: function(tabName) {

        var that = this;

        that.$buttons.removeClass(that._config.activeButton);
        that.$buttons.filter('[data-' + that._config.buttonsDataAttrName + '="' + tabName + '"]').addClass(that._config.activeButton);

        return that;
    },

    /**
     * @method showTab
     *
     * @param {String} tabName Имя вкладки, которую показываем
     */
    showTab: function(tabName) {

        var that = this,
            $tab = that.$tabs.filter('[data-' + that._config.tabsDataAttrName + '="' + tabName + '"]');

        that.$tabs.removeClass(that._config.activeTab);
        that.$tabs.addClass(that._config.hiddenTab);
        $tab.addClass(that._config.activeTab);
        $tab.removeClass(that._config.hiddenTab);

        return that;
    }

};

return NSwitchTabs;

})();

}