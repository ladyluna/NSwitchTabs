NSwitchTabs
===========

Переключатель Табов с возможностью запоминания выбранной табы в local storage

@version 2.5.0
@author Natalia Uvarova
 
---
@constructor NSwitchTabs

@param {jQuery Object} $container Контейнер блока с переключателями табов

@param {jQuery Object} $containerView Контейнер блока с контентом табов

@param {Object} params параметры

		{String} params.buttonsDataAttrName Имя data-атрибута для элементов переключателей табов
		
        {String} params.tabsDataAttrName Имя data-атрибута для элементов контента табов
        
        {String} params.activeButton Класс для обозначения текущего переключателя табы
        
        {String} params.activeTab Класс для обозначения текущей табы
        
        {String} params.hiddenTab Класс для обозначения скрытой табы
        
        {boolean} params.useLocalStorage Признак сохранять выбранную табу в localStorage или нет
        
        {String} params.keyLocalStorage Ключ для localStorage

Version 2.2.0:

Добавлена проверка на наличия существования табы (в случае когда мы достаём значение из localStorage)

Version 2.3.0:

Добавлена проверка на существование NSwitchTabs

Version 2.3.1:

Исправлена ошибка в _config 

Version 2.5.0:

Добавлена возможность переименования data-атрибутов, обозначающих элементы табов
Добавлено определение имени предыдущей табы по событию 'tabs.change'
